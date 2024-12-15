import { parseDocument, DomUtils } from "htmlparser2";
import * as vscode from "vscode";

export function getParentTag(
  document: vscode.TextDocument,
  selection: vscode.Selection
): string | null {
  const content = document.getText(); // Get the full document text
  const position = document.offsetAt(selection.start); // Get the selection start as an offset

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
          return childNode || node; // Return child if found, otherwise current node
        }
        return node;
      }
    }
    return null;
  }

  const enclosingNode = findEnclosingNode(dom.children, position);

  return enclosingNode ? enclosingNode.name || null : null;
}
