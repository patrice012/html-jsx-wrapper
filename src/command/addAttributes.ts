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

  // Merge new attributes with existing ones
  setTagAttributes(editor, selection, selectedText, parentTag, attributes);
}

// Function to prompt the user for attributes
async function promptForAttributes(tag: string): Promise<string> {
  const attributeInput = await vscode.window.showInputBox({
    prompt: `Enter attributes for <${tag}> (e.g., class="my-class" id="my-id")`,
    placeHolder: `class="my-class" id="my-id"`,
  });

  return attributeInput || "";
}

// Function to merge and set tag attributes
function setTagAttributes(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  selectedText: string,
  tag: string,
  newAttributes: string
) {
  const tagRegex = new RegExp(`<${tag}([^>]*)>`, "i");
  const match = selectedText.match(tagRegex);

  if (!match) {
    vscode.window.showErrorMessage(
      `No opening <${tag}> tag found in the selected text.`
    );
    return;
  }

  const originalTag = match[0];
  const existingAttributes = match[1]?.trim() || "";
  const mergedAttributes = mergeAttributes(existingAttributes, newAttributes);

  const updatedTag = `<${tag} ${mergedAttributes}>`;
  const updatedText = selectedText.replace(originalTag, updatedTag);

  editor
    .edit((editBuilder) => {
      editBuilder.replace(selection, updatedText);
    })
    .then(() => {
      vscode.commands.executeCommand("editor.action.formatDocument");
    });
}

// Function to merge attributes
function mergeAttributes(existing: string, newAttributes: string): string {
  const existingAttributes = parseAttributes(existing);
  const newAttributesObj = parseAttributes(newAttributes);

  // Merge attributes
  for (const key in newAttributesObj) {
    if (existingAttributes[key]) {
      if (key === "class") {
        // Merge `class` attributes (separated by space)
        const existingClasses = new Set(existingAttributes[key].split(/\s+/));
        const newClasses = newAttributesObj[key].split(/\s+/);
        newClasses.forEach((cls) => existingClasses.add(cls));
        existingAttributes[key] = Array.from(existingClasses).join(" ");
      } else if (key === "style") {
        // Merge `style` attributes (separated by semicolon)
        const existingStyles = parseStyle(existingAttributes[key]);
        const newStyles = parseStyle(newAttributesObj[key]);
        const mergedStyles = { ...existingStyles, ...newStyles };
        existingAttributes[key] = Object.entries(mergedStyles)
          .map(([styleKey, value]) => `${styleKey}: ${value}`)
          .join("; ");
      } else {
        // Overwrite other attributes
        existingAttributes[key] = newAttributesObj[key];
      }
    } else {
      // Add new attribute if it doesn't exist
      existingAttributes[key] = newAttributesObj[key];
    }
  }

  // Reconstruct attributes string
  return Object.entries(existingAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}

// Helper function to parse `style` attributes into an object
function parseStyle(style: string): Record<string, string> {
  const styleObj: Record<string, string> = {};
  style.split(";").forEach((stylePair) => {
    const [key, value] = stylePair.split(":").map((s) => s.trim());
    if (key && value) {
      styleObj[key] = value;
    }
  });
  return styleObj;
}

// Helper function to parse attributes into an object
function parseAttributes(attributes: string): Record<string, string> {
  const attributeRegex = /([a-z][a-z0-9-]*)\s*=\s*(["'])(.*?)\2/gi;
  const result: Record<string, string> = {};

  let match;
  while ((match = attributeRegex.exec(attributes)) !== null) {
    const key = match[1];
    const value = match[3];
    result[key] = value;
  }

  return result;
}
