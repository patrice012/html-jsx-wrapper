
# Embed & Modify Code Tags - VS Code Extension

A Visual Studio Code extension that streamlines HTML and code editing. This extension provides powerful commands to boost productivity when working with tags and attributes:

1.  **Embed selected code with a tag** - Quickly enclose any selected code block with your desired tag.
    
2.  **Add attributes to the first tag in the selection** - Effortlessly add attributes like `id`, `class`, and more to the first tag of the selected code block.
    
3.  **Wrap selected text with a tag** - Wrap the selected text or code block with a tag of your choice.
    

## Features

### 1. Embed Code with a Tag

Enclose any selected code block with a tag of your choice.

For example, selecting the code below:

```html
<p>This is a paragraph.</p>
```

And running the **"Embed Code with Tag"** command (`Ctrl+Shift+E`) will prompt you to enter a tag name (e.g., `div`). The result will be:

```html
<div>
  <p>This is a paragraph.</p>
</div>
```

----------

### 2. Add Attributes to the First Tag

Add attributes like `id`, `class`, or any other custom attribute to the first tag in the selection.

For example, selecting the code below:

```html
<div>
  <p>This is a paragraph.</p>
</div>
```

And running the **"Add Attributes"** command (`Ctrl+Shift+F`) will prompt you to enter attributes (e.g., `id="container" class="my-class"`). The result will be:

```html
<div id="container" class="my-class">
  <p>This is a paragraph.</p>
</div>
```

If the tag already has attributes (e.g., `class`), the new attributes are merged. For example, adding `class="new-class"` results in:

```html
<div id="container" class="my-class new-class">
  <p>This is a paragraph.</p>
</div>
```

----------

### 3. Wrap Selected Text with a Tag

Wrap the selected text or code block with a tag of your choice.

For example, selecting the text below:

```plaintext
This is a simple text block.
```

And running the **"Tag Wrapper"** command (`Ctrl+Shift+I`) will prompt you to enter a tag name (e.g., `span`). The result will be:

```html
<span>This is a simple text block.</span>
```


## Installation

1.  Open Visual Studio Code.
2.  Go to the Extensions view by clicking the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
3.  Search for "Embed & Modify Code Tags".
4.  Click **Install** to install the extension.
5.  Enjoy the productivity boost!


## How to Use

### Context Menu

-   Right-click on a selected block of code in the editor.
-   Choose one of the following commands:
    -   **"Embed Code with Tag"**
    -   **"Add Attributes"**
    -   **"Tag Wrapper"**

### Keyboard Shortcuts

-   **Embed Code with Tag**: `Ctrl+Shift+E` (when the editor has focus).
-   **Add Attributes**: `Ctrl+Shift+F` (when the editor has focus).
-   **Wrap Selected Text with a Tag**: `Ctrl+Shift+I` (when the editor has focus).

### Command Palette

-   Open the Command Palette (`Ctrl+Shift+P`).
-   Search for one of the following commands:
    -   **"Embed Code with Tag"**
    -   **"Add Attributes"**
    -   **"Tag Wrapper"**
-   Select the command and follow the prompts.


## Extension Settings

This extension currently has no user-configurable settings. Future updates may include customization options.


## Keybindings

This extension provides the following keybindings for easy usage:

Command

Keybinding

Description

**Embed Code with Tag**

`Ctrl+Shift+E`

Enclose the selected code block with a tag.

**Add Attributes to First Tag**

`Ctrl+Shift+F`

Add attributes to the first tag in the selection.

**Wrap Selected Text with Tag**

`Ctrl+Shift+I`

Wrap the selected text or code with a tag.

----------

## Release Notes

### 0.0.2

-   Initial release of **Embed & Modify Code Tags**.
-   Added:
    -   **Embed Code with Tag** command.
    -   **Add Attributes to First Tag** command.

### 0.0.1

-   Added **Wrap Selected Text with a Tag** command.
-   Updated the README with examples and detailed usage instructions.

----------

## Contributing

Contributions are welcome! To contribute:

1.  Fork this repository.
2.  Create a feature branch (`git checkout -b feature-branch`).
3.  Commit your changes (`git commit -m "Add feature"`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Open a pull request.

----------

## Issues & Feedback

If you encounter any issues or have feedback, please create an issue in the [GitHub repository](https://github.com/patrice012/html-jsx-wrapper). Your input is greatly appreciated!


## License

This extension is licensed under the MIT License. See the [MIT License](https://opensource.org/license/mit) file for details.