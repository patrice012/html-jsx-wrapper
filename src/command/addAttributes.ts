import * as vscode from "vscode";
import { getParentTag } from "../helper/getParentTag";

export async function addAttributes() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active editor found.");
    return;
  }

  const document = editor.document;
  const selection = editor.selection;

  if (selection.isEmpty) {
    vscode.window.showErrorMessage("No code selected.");
    return;
  }

  const selectedText = document.getText(selection);

  // Get the parent tag of the selected text
  const parentTag = getParentTag(document, selection);
  if (!parentTag) {
    vscode.window.showErrorMessage("Enclosing tag not found");
    return;
  }

  // Prompt the user to add attributes to the tag
  const attributes = await promptForAttributes(parentTag);

  // Wrap the selected text with the tag and attributes
  setTagAttributes(editor, selection, selectedText, parentTag, attributes);
}

// Function to prompt the user for attributes
async function promptForAttributes(tag: string): Promise<string> {
  // Ask the user for attributes
  const attributeInput = await vscode.window.showInputBox({
    prompt: `Enter attributes for <${tag}> (e.g., class="my-class" id="my-id")`,
    placeHolder: `class="my-class" id="my-id"`,
  });

  // If the user cancels or provides no input, return an empty string
  if (!attributeInput) {
    return "";
  }

  // Validate and normalize the input attributes
  const validatedAttributes = validateAndNormalizeAttributes(attributeInput);

  if (!validatedAttributes.valid) {
    // Show an error message if validation fails
    vscode.window.showErrorMessage(
      `Invalid attributes provided. ${validatedAttributes.message}`
    );
    return "";
  }

  return validatedAttributes.attributes;
}

// Helper function to validate and normalize attributes
function validateAndNormalizeAttributes(input: string): {
  valid: boolean;
  attributes: string;
  message?: string;
} {
  // Regular expression to match valid attribute patterns (key="value", key={value})
  const attributeRegex = /([a-z][a-z0-9-]*)\s*=\s*(["'][^"']*["']|\{[^}]*\})/gi;

  // Check for invalid characters outside attribute patterns
  if (/[^a-z0-9\s=:"'{}\-,]/i.test(input)) {
    return {
      valid: false,
      attributes: "",
      message: "Attributes contain invalid characters.",
    };
  }

  // Find and normalize all valid attributes
  const matches = [...input.matchAll(attributeRegex)];
  if (matches.length === 0) {
    return {
      valid: false,
      attributes: "",
      message:
        'No valid attributes found. Ensure attributes are formatted as key="value" or key={value}.',
    };
  }

  // Build the normalized attributes string
  const normalizedAttributes = matches
    .map((match) => {
      const key = match[1].toLowerCase(); // Ensure keys are lowercase
      const value = match[2].trim(); // Trim whitespace around values
      return `${key}=${value}`;
    })
    .join(" "); // Separate attributes with spaces

  return {
    valid: true,
    attributes: normalizedAttributes,
  };
}

function setTagAttributes(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  selectedText: string,
  tag: string,
  attributes: string
) {
  // Match the first occurrence of the tag in the selected text
  const tagRegex = new RegExp(`<${tag}(\\s[^>]*)?>`, "i");
  const match = selectedText.match(tagRegex);

  if (!match) {
    vscode.window.showErrorMessage(
      `No opening <${tag}> tag found in the selected text.`
    );
    return;
  }

  // Extract the tag and its current attributes
  const [originalTag, currentAttributes] = match;

  // Construct the updated tag with new attributes
  const updatedTag = currentAttributes
    ? originalTag.replace(currentAttributes, ` ${attributes}`)
    : `<${tag} ${attributes}>`;

  // Replace the original tag in the selected text
  const updatedText = selectedText.replace(originalTag, updatedTag);

  // Update the editor with the modified text
  editor
    .edit((editBuilder) => {
      editBuilder.replace(selection, updatedText);
    })
    .then(() => {
      // Trigger auto-formatting on the modified document
      vscode.commands.executeCommand("editor.action.formatDocument");
    });
}
