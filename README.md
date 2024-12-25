# Embed & Modify Code Tags - VS Code Extension

A Visual Studio Code extension that streamlines HTML and code editing. This extension provides two powerful commands to boost productivity when working with tags and attributes:

1.  **Embed selected code with a tag** - Quickly enclose any selected code block with your desired tag.

2.  **Add attributes to the first tag in the selection** - Effortlessly add attributes like `id`, `class`, and more to the first tag of the selected code block.

## Features

### 1. Embed Code with a Tag

Enclose any selected code block with a tag of your choice.

For example, selecting the code below:

```html
<p>This is a paragraph.</p>
```

And running the **"Embed Code with Tag"** command (`ctrl+shift+e`) will prompt you to enter a tag name (e.g., `div`). The result will be:

```html
<div>
  <p>This is a paragraph.</p>
</div>
```

### 2. Add Attributes to the First Tag

Add attributes like `id`, `class`, or any other custom attribute to the first tag in the selection.

For example, selecting the code below:

```html
<div>
  <p>This is a paragraph.</p>
</div>
```

And running the **"Add Attributes"** command (`ctrl+shift+f`) will prompt you to enter attributes (e.g., `id="container" class="my-class"`). The result will be:

```html
<div id="container" class="my-class">
  <p>This is a paragraph.</p>
</div>
```

## Installation

1. Open Visual Studio Code.

2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.

3. Search for "Embed & Modify Code Tags".

4. Click **Install** to install the extension.

5. Enjoy the productivity boost!

## How to Use

### Context Menu

- Right-click on a selected block of code in the editor.

- Choose **"Embed Code with Tag"** or **"Add Attributes"** from the context menu.

### Keyboard Shortcuts

- **Embed Code with Tag**: `Ctrl+Shift+E` (when the editor has focus).

- **Add Attributes**: `Ctrl+Shift+F` (when the editor has focus).

### Command Palette

- Open the Command Palette (`Ctrl+Shift+P`).

- Search for **"Embed Code with Tag"** or **"Add Attributes"**.

- Select the command and follow the prompts.

## Extension Settings

This extension currently has no user-configurable settings. Future updates may include customization options.

## Keybindings

This extension provides the following keybindings for easy usage:

| Command | Keybinding | Description |

| ------------------------------- | -------------- | ----------------------------------------------------- |

| **Embed Code with Tag** | `Ctrl+Shift+E` | Enclose the selected code block with a specified tag. |

| **Add Attributes to First Tag** | `Ctrl+Shift+F` | Add attributes to the first tag in the selected code. |

## Release Notes

### 1.0.0

- Initial release of **Embed & Modify Code Tags**.

- Added:

- **Embed Code with Tag** command.

- **Add Attributes to First Tag** command.

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.

2. Create a feature branch (`git checkout -b feature-branch`).

3. Commit your changes (`git commit -m "Add feature"`).

4. Push to the branch (`git push origin feature-branch`).

5. Open a pull request.

## Issues & Feedback

If you encounter any issues or have feedback, please create an issue in the ([html-jsx-wrapper](https://github.com/patrice012/html-jsx-wrapper)). Your input is greatly appreciated!

## License

This extension is licensed under the MIT License. See the [The MIT License](https://opensource.org/license/mit) file for details.
