/**
 * External Dependencies
 */
const path = require("path");

/**
 * WordPress Dependencies
 */
const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");

const { entry = {} } = defaultConfig;
const { index, editor } = entry;

module.exports = {
  ...defaultConfig,
  entry: {
    ...entry,
    index: [index, "./src/index.scss"],
    editor: [editor, "./src/editor.scss"],
  },
};
