import { setState, getState } from '../chromeStorage';
import {
  createTabs,
  getSelectedTabs,
  getAllTabs,
  closeTabsWithIds,
} from '../tabManager';

export const ADD_TAB_GROUP = 'ADD_TAB_GROUP';
export const SET_SAVE_SELECTED = 'SET_SAVE_SELECTED';
export const REMOVE_TAB_GROUP = 'REMOVE_TAB_GROUP';
export const SET_TAB_GROUP_NAME = 'SET_TAB_GROUP_NAME';
export const SET_TAB_GROUP_ERROR = 'SET_TAB_GROUP_ERROR';

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

const addTabGroup = ({ name, tabs }) => ({
  type: ADD_TAB_GROUP,
  name,
  tabs,
});

// TODO: handle error case with catch and visualize it
export const syncSaveSelected = saveSelected => dispatch =>
  setState({ saveSelected })
    .then(() => dispatch(setSaveSelected(saveSelected)));

export const openTabGroup = tabs => createTabs(tabs);

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
    let tabs;
    // get the tabs to save
    tabSelectFunction()
      // hold onto the tabs context
      .then(tabsToSave => (tabs = tabsToSave))
      // get the current tab group state
      .then(() => getState())
      // parse out the tab groups
      .then(state => state.tabGroups)
      // save the new tab group
      .then(tabGroups => setState({
        tabGroups: [...tabGroups, { name: tabGroupName, tabs: cleanTabs(tabs) }],
      }))
      // sync the redux store
      .then(() => dispatch(addTabGroup({ name: tabGroupName, tabs: cleanTabs(tabs) })))
      // close tabs (if needed)
      .then(() => {
        if (close) {
          closeTabsWithIds(tabs.map(tab => tab.id));
        }
      })
      // clear the text input
      .then(dispatch(setTabGroupName('')));
  }
};
