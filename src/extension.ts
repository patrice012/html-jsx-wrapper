import * as vscode from "vscode";
import { embedWithTag } from "./command/embedWithTag";
import { addAttributes } from "./command/addAttributes";
import { wrapWithTag } from "./command/wrapWithTag";

export function activate(context: vscode.ExtensionContext) {
  const embedCommand = vscode.commands.registerCommand(
    "extension.embedWithTag",
    embedWithTag
  );

  const attributesCommand = vscode.commands.registerCommand(
    "extension.addAttributes",
    addAttributes
  );

  const wrapWithTagCommand = vscode.commands.registerCommand(
    "extension.wrapWithTag",
    wrapWithTag
  );

  context.subscriptions.push(embedCommand);
  context.subscriptions.push(attributesCommand);
  context.subscriptions.push(wrapWithTagCommand);
}

export function deactivate() {
  console.log("Extension deactivated: Embed With Tag triggered");
}
