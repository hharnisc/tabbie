import {
  unhover,
} from '@bufferapp/redux-hover';
import {
  getSelectedTabs,
  getAllTabs,
} from '../tabManager';

export const ADD_TAB_GROUP = 'ADD_TAB_GROUP';
export const CLOSE_TAB_GROUP = 'CLOSE_TAB_GROUP';
export const OPEN_TAB_GROUP = 'OPEN_TAB_GROUP';
export const SET_SAVE_SELECTED = 'SET_SAVE_SELECTED';
export const REMOVE_TAB_GROUP = 'REMOVE_TAB_GROUP';
export const SET_TAB_GROUP_NAME = 'SET_TAB_GROUP_NAME';
export const SET_TAB_GROUP_ERROR = 'SET_TAB_GROUP_ERROR';
export const RESYNC_TAB_GROUPS = 'RESYNC_TAB_GROUPS';
export const SCREEN_VIEW = 'SCREEN_VIEW';

const setTabGroupError = tabGroupError => ({
  type: SET_TAB_GROUP_ERROR,
  tabGroupError,
});

const setTabGroupName = tabGroupName => ({
  type: SET_TAB_GROUP_NAME,
  tabGroupName,
});

const closeTabGroup = tabIds => ({
  type: CLOSE_TAB_GROUP,
  tabIds,
});

export const screenView = screen => ({
  type: SCREEN_VIEW,
  screen,
});

export const resyncTabGroups = tabGroups => ({
  type: RESYNC_TAB_GROUPS,
  tabGroups,
});

export const addTabGroup = ({ close, name, sync, tabs }) => ({
  type: ADD_TAB_GROUP,
  close,
  name,
  sync,
  tabs,
});

export const setSaveSelected = ({ saveSelected, sync }) => ({
  type: SET_SAVE_SELECTED,
  saveSelected,
  sync,
});

export const openTabGroup = tabs => ({
  type: OPEN_TAB_GROUP,
  tabs,
});

export const removeTabGroup = ({ tabGroupKey, sync }) => dispatch =>
  Promise.all([
    dispatch({
      type: REMOVE_TAB_GROUP,
      tabGroupKey,
      sync,
    }),
    dispatch(unhover(`tab-group-list-item/remove-${tabGroupKey}`)),
  ]);

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
    tabSelectFunction()
      .then(tabs => Promise.all([
        dispatch(addTabGroup({
          close,
          name: tabGroupName,
          sync: true,
          tabs: cleanTabs(tabs),
        })),
        close ? dispatch(closeTabGroup(tabs.map(tab => tab.id))) : null,
        dispatch(setTabGroupName('')),
      ]));
  }
};
