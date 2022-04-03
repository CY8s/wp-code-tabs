import classNames from "classnames";

/**
 * @component
 * @param {Object} props
 * @param {string} props.className
 * @param {Array} props.children
 * @param {Function} props.onClose
 * @param {Function} props.onClick
 * @param {boolean} props.isActive
 * @returns {Tab}
 */
const Tab = ({
  className,
  children,
  onClose,
  onClick,
  isActive = false,
  ...props
}) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose(e);
  };
  return (
    <>
      <div
        className={classNames("cyct-tab", {
          [`cyct-tab--active`]: isActive,
          [`${className}`]: !!className,
        })}
        onClick={onClick}
        {...props}
      >
        <div className={classNames("cyct-tab__content")}>{children}</div>
        {onClose && (
          <a
            className={classNames("cyct-tab__close-btn")}
            onClick={handleClose}
          >
            Close Tab
          </a>
        )}
      </div>
    </>
  );
};

export default Tab;
