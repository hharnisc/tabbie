import { setState, getState } from '../chromeStorage';
import {
  createTabs,
  getSelectedTabs,
  getAllTabs,
  closeTabsWithIds,
} from '../tabManager';

export const ADD_TAB_GROUP = 'ADD_TAB_GROUP';
export const OPEN_TAB_GROUP = 'OPEN_TAB_GROUP';
export const SET_SAVE_SELECTED = 'SET_SAVE_SELECTED';
export const REMOVE_TAB_GROUP = 'REMOVE_TAB_GROUP';
export const SET_TAB_GROUP_NAME = 'SET_TAB_GROUP_NAME';
export const SET_TAB_GROUP_ERROR = 'SET_TAB_GROUP_ERROR';
export const HOVER_TAB_GROUP_OPEN = 'HOVER_TAB_GROUP_OPEN';
export const UNHOVER_TAB_GROUP_OPEN = 'UNHOVER_TAB_GROUP_OPEN';
export const HOVER_TAB_GROUP_REMOVE = 'HOVER_TAB_GROUP_REMOVE';
export const UNHOVER_TAB_GROUP_REMOVE = 'UNHOVER_TAB_GROUP_REMOVE';
export const SET_SAVE_AND_CLOSE_HOVER_STATE = 'SET_SET_SAVE_AND_CLOSE_HOVER_STATE';

const setSaveSelected = saveSelected => ({
  type: SET_SAVE_SELECTED,
  saveSelected,
});

const setRemoveTabGroup = tabGroupKey => ({
  type: REMOVE_TAB_GROUP,
  tabGroupKey,
});

const setTabGroupError = tabGroupError => ({
  type: SET_TAB_GROUP_ERROR,
  tabGroupError,
});

const setTabGroupName = tabGroupName => ({
  type: SET_TAB_GROUP_NAME,
  tabGroupName,
});

const addTabGroup = ({ name, tabs, tabIds, close }) => ({
  type: ADD_TAB_GROUP,
  name,
  tabs,
  tabIds,
  close,
});

const openTabs = tabs => ({
  type: OPEN_TAB_GROUP,
  tabs,
});

// TODO: handle error case with catch and visualize it
export const syncSaveSelected = saveSelected => dispatch =>
  setState({ saveSelected })
    .then(() => dispatch(setSaveSelected(saveSelected)));

export const setSaveAndCloseHoverState = isHovering => ({
  type: SET_SAVE_AND_CLOSE_HOVER_STATE,
  isHovering,
});

export const hoverTabGroupOpen = tabGroupKey => ({
  type: HOVER_TAB_GROUP_OPEN,
  tabGroupKey,
});

export const unhoverTabGroupOpen = tabGroupKey => ({
  type: UNHOVER_TAB_GROUP_OPEN,
  tabGroupKey,
});

export const hoverTabGroupRemove = tabGroupKey => ({
  type: HOVER_TAB_GROUP_REMOVE,
  tabGroupKey,
});

export const unhoverTabGroupRemove = tabGroupKey => ({
  type: UNHOVER_TAB_GROUP_REMOVE,
  tabGroupKey,
});

export const openTabGroup = tabs => dispatch =>
  createTabs(tabs)
    .then(() => dispatch(openTabs(tabs)));

// TODO: handle error case with catch and visualize it
export const removeTabGroup = tabGroupKey => dispatch =>
  getState()
    .then(state => state.tabGroups)
    .then(tabGroups => setState({
      tabGroups: tabGroups.filter((tabGroup, i) => i !== tabGroupKey),
    }))
    .then(() => dispatch(setRemoveTabGroup(tabGroupKey)));

export const tabGroupNameChange = tabGroupName => dispatch =>
  Promise.all([
    dispatch(setTabGroupError(false)),
    dispatch(setTabGroupName(tabGroupName)),
  ]);

const cleanTabs = tabs => tabs.map(tab => ({
  url: tab.url,
  pinned: tab.pinned,
}));

export const saveTabGroup = ({ tabGroupName, close, saveSelected }) => (dispatch) => {
  if (!tabGroupName) {
    dispatch(setTabGroupError(true));
  } else {
    const tabSelectFunction = saveSelected ? getSelectedTabs : getAllTabs;
    // get the tabs to save
    tabSelectFunction()
      // sync the redux store
      .then(tabs => dispatch(addTabGroup({
        name: tabGroupName,
        tabs: cleanTabs(tabs),
        tabIds: tabs.map(tab => tab.id),
        close,
      })))
      // clear the text input
      .then(dispatch(setTabGroupName('')));
  }
};
