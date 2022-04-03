import { CodePanel } from "../";

const CodePanels = ({
  tabs = [],
  currentTab = -1,
  onTitleChange = () => {},
  onContentChange = () => {},
}) => {
  return (
    <>
      <div className="code-carousel">
        <div
          className="code-carousel__container"
          style={{
            marginLeft: currentTab && `-${currentTab * 100}%`,
          }}
        >
          {tabs.map(({ title, content }, index) => (
            <div className="code-carousel__item">
              <div>
                <CodePanel
                  title={title}
                  content={content}
                  onTitleChange={(title) => onTitleChange(title, index)}
                  onContentChange={(content) => onContentChange(content, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CodePanels;
