import { parseDocument } from "htmlparser2";
import * as vscode from "vscode";

export function getParentTag(
  document: vscode.TextDocument,
  selection: vscode.Selection
): string | null {
  // Get the full document text
  const content = document.getText();
  // Get the selection start as an offset
  let position = document.offsetAt(selection.start);

  // Trim leading whitespace from the selected text
  const selectedText = document.getText(selection);
  const trimmedSelectedText = selectedText.trimStart();

  // Adjust the offset to account for trimmed whitespace
  const leadingWhitespaceLength =
    selectedText.length - trimmedSelectedText.length;
  position += leadingWhitespaceLength;

  // Parse the document with start and end indices enabled
  const dom = parseDocument(content, {
    withStartIndices: true,
    withEndIndices: true,
  });

  // Recursively find the node that encloses the given offset
  function findEnclosingNode(nodes: any[], position: number): any {
    for (const node of nodes) {
      if (node.startIndex <= position && node.endIndex >= position) {
        if (node.children && node.children.length > 0) {
          // Recurse into children
          const childNode = findEnclosingNode(node.children, position);
          // Return child if found, otherwise current node
          return childNode || node;
        }
        return node;
      }
    }
    return null;
  }

  const enclosingNode = findEnclosingNode(dom.children, position);

  return enclosingNode ? enclosingNode.name || null : null;
}
