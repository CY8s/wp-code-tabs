import { withInstanceId } from "@wordpress/compose";
import { compose } from "@wordpress/compose";
import { useEffect, useReducer } from "@wordpress/element";
import { TabBar, CodePanels } from "../../components";
import codeTabReducer, { initialState, ActionType } from "./codeTabReducer";

const CYCTCodeTabsBlock = ({
  attributes,
  setAttributes,
  instanceId,
  ...props
}) => {
  const [state, dispatch] = useReducer(codeTabReducer, initialState);

  /**
   * Initialize Tabs on First Load
   */
  useEffect(() => {
    if (attributes.tabs) {
      dispatch({
        type: ActionType.INITIALIZE_TABS,
        payload: JSON.parse(attributes.tabs),
      });
    }
  }, []);

  /**
   * Update Block Attributes to Match State
   */
  setAttributes({
    tabs: state.tabs && state.tabs.length ? JSON.stringify(state.tabs) : "",
  });

  return (
    <>
      <TabBar
        tabs={state.tabs}
        currentTab={state.currentTab}
        onClick={(i) => dispatch({ type: ActionType.SELECT_TAB, payload: i })}
        onClose={(i) => dispatch({ type: ActionType.REMOVE_TAB, payload: i })}
        onAddTab={() => dispatch({ type: ActionType.ADD_TAB })}
      />
      <CodePanels
        tabs={state.tabs || []}
        currentTab={state.currentTab}
        onTitleChange={(title, index) =>
          dispatch({
            type: ActionType.UPDATE_TAB_TITLE,
            payload: { title, index },
          })
        }
        onContentChange={(content, index) =>
          dispatch({
            type: ActionType.UPDATE_TAB_CONTENT,
            payload: { content, index },
          })
        }
      />
    </>
  );
};

export default compose([withInstanceId])(CYCTCodeTabsBlock);
