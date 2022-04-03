import { Tab } from "../";

/**
 *
 * @param {Object} props
 * @param {string} props.className
 * @param {Array} props.children
 * @param {Function} props.onClose
 * @param {Function} props.onClick
 * @param {boolean} props.draggable
 * @returns {TabBar}
 */
const TabBar = ({
  tabs = [],
  currentTab = -1,
  onClick = () => {},
  onClose = () => {},
  onAddTab,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {tabs.map(({ title, content }, index) => (
          <Tab
            onClick={() => {
              onClick(index);
            }}
            onClose={() => onClose(index)}
            isActive={index == currentTab}
          >
            {title || `Tab #${index + 1}`}
          </Tab>
        ))}
        {onAddTab && (
          <button className="cyct-add-button" onClick={onAddTab}>
            Add Tab
          </button>
        )}
      </div>
    </>
  );
};

export default TabBar;
