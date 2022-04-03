import { TextControl } from "@wordpress/components";
import Editor from "react-simple-code-editor";

const CodePanel = ({
  content = "",
  title = "",
  style = {},
  onTitleChange = () => {},
  onContentChange = () => {},
}) => {
  return (
    <div style={style}>
      <div>
        <label
          style={{
            display: "block",
            padding: 15,
            fontSize: "small",
          }}
        >
          Title
          <TextControl
            value={title}
            onChange={onTitleChange}
            style={{
              width: "auto",
            }}
          />
        </label>
      </div>
      <Editor
        value={content}
        language="js"
        placeholder="Please enter code."
        highlight={(code) => code}
        onValueChange={(code) => onContentChange(code)}
        padding={15}
        style={{
          fontFamily: `Menlo,Consolas,monaco,monospace`,
          minHeight: 200,
        }}
      />
    </div>
  );
};

export default CodePanel;
