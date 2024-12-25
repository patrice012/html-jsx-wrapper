import * as vscode from "vscode";
import { getParentTag } from "../helper/getParentTag";
import { getValidEnclosedTags } from "../helper/getValidEnclosedTags";

export async function embedWithTag() {
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

  // Prompt the user with filtered tags
  const tag = await showFilteredTagPicker(parentTag as string);
  if (!tag) {
    vscode.window.showInformationMessage("No tag selected.");
    return;
  }

  // Wrap the selected text with the tag and attributes
  wrapSelectedText(editor, selection, selectedText, tag);
}

async function showFilteredTagPicker(
  parentTag: string
): Promise<string | undefined> {
  const validTags = getValidEnclosedTags(parentTag);
  const extendedTags = [...validTags, "Custom Input..."];

  // Show the quick pick menu
  const selected = await vscode.window.showQuickPick(extendedTags, {
    placeHolder: `Select a tag to wrap your code or choose "Custom Input..."`,
    canPickMany: false,
  });

  // Handle user selection
  if (selected === "Custom Input...") {
    // Allow user to provide custom input
    const customInput = await vscode.window.showInputBox({
      prompt: `Enter a custom tag to wrap your code`,
      placeHolder: "custom-tag",
      validateInput: (input) => {
        // Validate the custom input (e.g., ensure it's a valid HTML tag name)
        const isValidTag = /^[a-zA-Z][a-zA-Z0-9-]*$/.test(input);
        return isValidTag
          ? null
          : "Enter a valid tag name (e.g., div, my-custom-tag)";
      },
    });

    return customInput || undefined;
  }

  return selected || undefined;
}

function wrapSelectedText(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  selectedText: string,
  tag: string
) {
  // Add attributes to the opening tag if any
  const openingTag = `<${tag}>`;
  const wrappedText = `${openingTag}\n${selectedText}\n</${tag}>`;

  editor
    .edit((editBuilder) => {
      editBuilder.replace(selection, wrappedText);
    })
    .then(() => {
      // Trigger auto-formatting on the modified document
      vscode.commands.executeCommand("editor.action.formatDocument");
    });

  /*
  "editor.action.formatDocument" format the entire document.
  "editor.action.formatSelection"  format just the modified part.
 */
}
