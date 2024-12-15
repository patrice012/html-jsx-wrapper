import * as vscode from "vscode";
import { getParentTag } from "./helper/getParentTag";
import { getValidEnclosedTags } from "./helper/getValidEnclosedTags";

export function activate(context: vscode.ExtensionContext) {
  const embedCommand = vscode.commands.registerCommand(
    "extension.embedWithTag",
    async () => {
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
      console.log(parentTag, "parentTag");

      // Prompt the user with filtered tags
      const tag = await showFilteredTagPicker(parentTag as string);
      if (!tag) {
        vscode.window.showErrorMessage("No tag selected.");
        return;
      }

      // Wrap the selected text
      wrapSelectedText(editor, selection, selectedText, tag);
    }
  );

  context.subscriptions.push(embedCommand);
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
  const wrappedText = `<${tag}>\n${selectedText}\n</${tag}>`;

  editor.edit((editBuilder) => {
    editBuilder.replace(selection, wrappedText);
  });
}

export function deactivate() {
  console.log("Extension deactivated: Embed With Tag triggered");
}
