# Changelog

## [0.0.2] - 2024-12-26
### Fixed
- Merged attributes correctly when updating HTML tags.
  - Appended new `class` values to existing `class` attributes instead of replacing them.
  - Handled `style` attributes by merging properties instead of overwriting.
  - Ensured proper handling of other attributes (e.g., `data-*`, `id`) without loss.

## [0.0.1] - 2024-12-25
### Added
- Initial release of the extension.
