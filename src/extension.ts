import * as vscode from "vscode";
import { embedWithTag } from "./command/embedWithTag";
import { addAttributes } from "./command/addAttributes";

export function activate(context: vscode.ExtensionContext) {
  const embedCommand = vscode.commands.registerCommand(
    "extension.embedWithTag",
    embedWithTag
  );

  const attributesCommand = vscode.commands.registerCommand(
    "extension.addAttributes",
    addAttributes
  );

  context.subscriptions.push(embedCommand);
  context.subscriptions.push(attributesCommand);
}

export function deactivate() {
  console.log("Extension deactivated: Embed With Tag triggered");
}
