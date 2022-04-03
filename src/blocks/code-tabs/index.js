import { registerBlockType, createBlock } from "@wordpress/blocks";

import { InnerBlocks } from "@wordpress/block-editor";

import edit from "./edit";
import save from "./save";
import deprecated from "./deprecated";

const name = "cyct/code-tabs";

registerBlockType(name, {
  title: "Code Tabs",
  icon: "media-code",
  category: "common",
  supports: {
    multiple: true,
    className: "cyct",
    lightBlockWrapper: false,
  },
  attributes: {
    tabs: {
      type: "string",
    },
  },
  edit,
  save,
  deprecated,
});
