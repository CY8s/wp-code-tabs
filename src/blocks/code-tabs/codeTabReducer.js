/**
 * @module codeTabReducer
 */

/**
 * @typedef {string} ActionType
 * @property {string} ADD_TAB "ADD_TAB"
 * @property {string} REMOVE_TAB "REMOVE_TAB"
 * @property {string} SELECT_TAB "SELECT_TAB"
 * @property {string} UPDATE_TAB_TITLE "UPDATE_TAB_TITLE"
 * @property {string} UPDATE_TAB_CONTENT "UPDATE_TAB_CONTENT"
 * @property {string} INITIALIZE_TABS "INITIALIZE_TABS"
 */

/**
 * @typedef {Object} State
 * @property {Array} tabs
 * @property {number} currentTab
 */

/**
 * Initial State
 *
 * @constant
 * @type {State}
 */
export const initialState = {
  count: 0,
  tabs: [],
  currentTab: 0,
};

/**
 * Enumeration of Reducer Actions
 * @readonly
 * @enum {ActionType}
 */
export const ActionType = {
  RANDOMIZE: "RANDOMIZE",
  ADD_TAB: "ADD_TAB",
  REMOVE_TAB: "REMOVE_TAB",
  SELECT_TAB: "SELECT_TAB",
  UPDATE_TAB_TITLE: "UPDATE_TAB_TITLE",
  UPDATE_TAB_CONTENT: "UPDATE_TAB_CONTENT",
  INITIALIZE_TABS: "INITIALIZE_TABS",
};

/**
 * Get valid index for focused tab
 *
 * @private
 * @param {Array} tabs
 * @param {number} selectedTab
 * @returns {number}
 */
const getValidCurrentTab = (tabs, selectedTab = 0) => {
  return selectedTab < tabs.length
    ? Math.max(0, selectedTab)
    : Math.max(0, tabs.length - 1);
};

/**
 * Add tab to array
 *
 * @private
 * @param {Array} tabs
 * @returns {Array}
 */
const addTab = (tabs = []) => {
  tabs.push({
    title: null,
    content: null,
  });
  return tabs;
};

/**
 * Modify state to reflect added tab
 *
 * @private
 * @param {Object} state
 * @returns {Object}
 */
const modifyAddTabState = (state) => {
  const tabs = addTab(state.tabs);
  const currentTab = getValidCurrentTab(tabs, tabs.length - 1);

  return {
    tabs,
    currentTab,
  };
};

/**
 *
 * @private
 * @param {Array} tabs
 * @param {Number} payload
 * @returns {Array}
 */
const removeTab = (tabs, payload = -1) => {
  const indexToRemove = payload >= 0 ? payload : tabs.length - 1;
  return tabs.filter((_, i) => i != indexToRemove);
};

const modifyRemoveTabState = (state, payload) => {
  const tabs = removeTab(state.tabs, payload);
  const currentTab = getValidCurrentTab(tabs, state.currentTab);

  return {
    tabs,
    currentTab,
  };
};

/**
 * @private
 * @param {Array} tabs
 * @param {Object} payload
 * @returns {Array}
 */
const updateTabTitle = (tabs, payload) => {
  const { title, index } = payload;

  if (tabs.length <= index) {
    throw new Error();
  }

  tabs[index].title = title;

  return tabs;
};

/**
 * @private
 * @param {Array} tabs
 * @param {Object} payload
 * @returns {Array}
 */
const updateTabContent = (tabs, payload) => {
  const { content, index } = payload;

  if (tabs.length <= index) {
    throw new Error();
  }

  tabs[index].content = content;

  return tabs;
};

/**
 *
 * @param {Object} state Current state
 * @param {number} state.currentTab Index of focused tab
 * @param {Object} action
 * @param {ActionType} action.type Action for reducer to perform
 * @param {*} action.payload Additional params necessary for reducer task
 * @returns {State} Updated state
 * @default
 */
const codeTabReducer = (state, action) => {
  const { type, payload } = action;
  if (!type) {
    throw new Error();
  }

  switch (type) {
    case ActionType.ADD_TAB:
      return {
        ...state,
        ...modifyAddTabState(state),
      };
      break;
    case ActionType.REMOVE_TAB:
      return {
        ...state,
        ...modifyRemoveTabState(state, payload),
      };
      break;
    case ActionType.SELECT_TAB:
      return {
        ...state,
        currentTab: getValidCurrentTab(state.tabs, payload),
      };
    case ActionType.UPDATE_TAB_TITLE:
      return {
        ...state,
        tabs: updateTabTitle(state.tabs, payload),
      };
      break;
    case ActionType.UPDATE_TAB_CONTENT:
      return {
        ...state,
        tabs: updateTabContent(state.tabs, payload),
      };
      break;
    case ActionType.INITIALIZE_TABS:
      return {
        ...state,
        tabs: payload || [],
      };
      break;
    default:
      throw new Error();
  }
};

export default codeTabReducer;
