interface TagRules {
  allowedChildren: string[]; // Tags that can be enclosed inside this tag
  type: "block" | "inline" | "mixed" | "special" | "void"; // Type of the tag
  canBeEnclosedBy?: string[]; // Tags that can enclose this tag
  allowsFlowContent?: boolean; // Whether this tag supports both inline and block content
}

const htmlTagRules: Record<string, TagRules> = {
  html: {
    allowedChildren: ["head", "body"],
    type: "special",
    canBeEnclosedBy: [],
  },
  head: {
    allowedChildren: ["title", "meta", "link", "style", "script"],
    type: "special",
    canBeEnclosedBy: ["html"],
  },
  body: {
    allowedChildren: ["*"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["html"],
  },
  div: {
    allowedChildren: ["*"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["*", "body", "section", "article"],
  },
  span: {
    allowedChildren: [
      "a",
      "em",
      "strong",
      "span",
      "br",
      "img",
      "input",
      "button",
      "code",
      "i",
      "b",
    ],
    type: "inline",
    canBeEnclosedBy: ["div", "p", "section", "article", "span", "a"],
  },
  a: {
    allowedChildren: ["em", "strong", "span", "br", "img", "code", "i", "b"],
    type: "inline",
    canBeEnclosedBy: ["span", "p", "div"],
  },
  ul: {
    allowedChildren: ["li"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  ol: {
    allowedChildren: ["li"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  li: {
    allowedChildren: ["*"],
    type: "mixed",
    allowsFlowContent: true,
    canBeEnclosedBy: ["ul", "ol"],
  },
  p: {
    allowedChildren: [
      "a",
      "em",
      "strong",
      "span",
      "br",
      "img",
      "input",
      "button",
      "code",
      "i",
      "b",
    ],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  img: {
    allowedChildren: [],
    type: "void",
    canBeEnclosedBy: ["p", "div", "span"],
  },
};

export function getValidEnclosedTags(childTag: string): string[] {
  const childRules = htmlTagRules[childTag];

  if (!childRules) {
    return [];
  }

  if (childRules.canBeEnclosedBy && childRules.canBeEnclosedBy.includes("*")) {
    // If the child tag can be enclosed by any tag, return all possible tags
    return Object.keys(htmlTagRules);
  }

  // Otherwise, return the explicitly defined parent tags
  return childRules.canBeEnclosedBy || [];
}
