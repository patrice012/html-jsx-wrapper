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
  return vscode.window.showQuickPick(validTags, {
    placeHolder: `Select a tag to wrap your code`,
  });
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
