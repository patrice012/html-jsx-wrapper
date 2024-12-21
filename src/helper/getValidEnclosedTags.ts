interface TagRules {
  // Tags that can be enclosed inside this tag
  allowedChildren: string[];
  // Type of the tag
  type: "block" | "inline" | "mixed" | "special" | "void";
  // Tags that can enclose this tag
  canBeEnclosedBy?: string[];
  // Whether this tag supports both inline and block content
  allowsFlowContent?: boolean;
}

const htmlTagRules: Record<string, TagRules> = {
  // Most used tags
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

  // Semantic HTML5 elements
  section: {
    allowedChildren: ["*", "header", "footer", "article", "aside"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["div", "body", "article", "main"],
  },
  article: {
    allowedChildren: ["*", "header", "footer", "section", "aside"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["div", "body", "section", "main"],
  },
  aside: {
    allowedChildren: ["*"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["div", "body", "section", "article", "main"],
  },
  header: {
    allowedChildren: ["*", "nav", "h1", "h2", "h3", "h4", "h5", "h6"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  footer: {
    allowedChildren: ["*", "nav"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  main: {
    allowedChildren: ["*", "section", "article", "aside", "header", "footer"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["body"],
  },
  nav: {
    allowedChildren: ["*", "ul", "ol", "a", "div"],
    type: "block",
    allowsFlowContent: true,
    canBeEnclosedBy: ["header", "footer", "body", "div"],
  },

  // Text-related tags
  h1: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body", "header"],
  },
  h2: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body", "header"],
  },
  h3: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body", "header"],
  },
  h4: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body", "header"],
  },
  h5: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body", "header"],
  },
  h6: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body", "header"],
  },

  // Form elements
  form: {
    allowedChildren: ["*", "input", "button", "textarea", "label", "select"],
    type: "block",
    canBeEnclosedBy: ["div", "body", "section", "article"],
  },
  input: {
    allowedChildren: [],
    type: "void",
    canBeEnclosedBy: ["form", "div", "label"],
  },
  button: {
    allowedChildren: ["*", "span"],
    type: "inline",
    canBeEnclosedBy: ["form", "div", "body"],
  },
  textarea: {
    allowedChildren: [],
    type: "void",
    canBeEnclosedBy: ["form", "div", "label"],
  },
  select: {
    allowedChildren: ["option"],
    type: "inline",
    canBeEnclosedBy: ["form", "div", "label"],
  },
  option: {
    allowedChildren: ["*"],
    type: "inline",
    canBeEnclosedBy: ["select"],
  },
  label: {
    allowedChildren: ["*", "span", "input", "textarea"],
    type: "inline",
    canBeEnclosedBy: ["form", "div"],
  },

  // Media elements
  video: {
    allowedChildren: ["source", "track"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article"],
  },
  audio: {
    allowedChildren: ["source", "track"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article"],
  },
  source: {
    allowedChildren: [],
    type: "void",
    canBeEnclosedBy: ["video", "audio"],
  },
  track: {
    allowedChildren: [],
    type: "void",
    canBeEnclosedBy: ["video", "audio"],
  },
  canvas: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  svg: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },

  // Table elements
  table: {
    allowedChildren: ["thead", "tbody", "tfoot", "tr"],
    type: "block",
    canBeEnclosedBy: ["div", "section", "article", "body"],
  },
  thead: {
    allowedChildren: ["tr"],
    type: "block",
    canBeEnclosedBy: ["table"],
  },
  tbody: {
    allowedChildren: ["tr"],
    type: "block",
    canBeEnclosedBy: ["table"],
  },
  tfoot: {
    allowedChildren: ["tr"],
    type: "block",
    canBeEnclosedBy: ["table"],
  },
  tr: {
    allowedChildren: ["td", "th"],
    type: "block",
    canBeEnclosedBy: ["thead", "tbody", "tfoot"],
  },
  td: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["tr"],
  },
  th: {
    allowedChildren: ["*"],
    type: "block",
    canBeEnclosedBy: ["tr"],
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
