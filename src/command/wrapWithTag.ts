import * as vscode from "vscode";
import { getParentTag } from "../helper/getParentTag";
import { getValidEnclosedTags } from "../helper/getValidEnclosedTags";

export async function wrapWithTag() {
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
  if (!parentTag) {
    vscode.window.showInformationMessage("No tag selected.");
    return;
  }

  // Determine the default tag
  const validTags = getValidEnclosedTags(parentTag);
  const defaultChoice = validTags.find((tag) => tag !== parentTag);
  const defaultTag = defaultChoice || "div";

  wrapSelectedText(editor, selection, selectedText, defaultTag);
}

function wrapSelectedText(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  selectedText: string,
  defaultTag: string
) {
  const placeholderTag = defaultTag;
  const openingTag = `<${placeholderTag} `;
  const closingTag = `</${placeholderTag}>`;
  const wrappedText = `${openingTag}>\n${selectedText}\n${closingTag}`;

  editor
    .edit((editBuilder) => {
      editBuilder.replace(selection, wrappedText);
    })
    .then((applied) => {
      if (applied) {
        // Trigger auto-formatting after the edit is applied
        return vscode.commands.executeCommand("editor.action.formatDocument");
      }
    })
    .then(
      () => {
        // Calculate the position of the cursor inside the opening tag's attribute area
        const startPosition = selection.start;
        const cursorPosition = startPosition.translate(
          0,
          1 + placeholderTag.length
        ); // Inside the opening tag, after the tag name

        // Create a new selection for the cursor
        const newSelection = new vscode.Selection(
          cursorPosition,
          cursorPosition
        );

        // Set the selection and reveal the cursor position
        editor.selection = newSelection;
        editor.revealRange(new vscode.Range(cursorPosition, cursorPosition));
      },
      (error) => {
        console.error("Error in wrapSelectedText:", error);
      }
    );
}
