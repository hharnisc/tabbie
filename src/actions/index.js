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
export const HOVER_TAB_GROUP_OPEN = 'HOVER_TAB_GROUP_OPEN';
export const UNHOVER_TAB_GROUP_OPEN = 'UNHOVER_TAB_GROUP_OPEN';
export const HOVER_TAB_GROUP_REMOVE = 'HOVER_TAB_GROUP_REMOVE';
export const UNHOVER_TAB_GROUP_REMOVE = 'UNHOVER_TAB_GROUP_REMOVE';
export const SET_SAVE_AND_CLOSE_HOVER_STATE = 'SET_SET_SAVE_AND_CLOSE_HOVER_STATE';
export const RESYNC_TAB_GROUPS = 'RESYNC_TAB_GROUPS';

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

export const resyncTabGroups = tabGroups => ({
  type: RESYNC_TAB_GROUPS,
  tabGroups,
});

export const addTabGroup = ({ name, tabs, sync }) => ({
  type: ADD_TAB_GROUP,
  name,
  tabs,
  sync,
});

export const setSaveSelected = ({ saveSelected, sync }) => ({
  type: SET_SAVE_SELECTED,
  saveSelected,
  sync,
});

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

export const openTabGroup = tabs => ({
  type: OPEN_TAB_GROUP,
  tabs,
});

export const removeTabGroup = ({ tabGroupKey, sync }) => ({
  type: REMOVE_TAB_GROUP,
  tabGroupKey,
  sync,
});

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
          name: tabGroupName,
          tabs: cleanTabs(tabs),
          sync: true,
        })),
        close ? dispatch(closeTabGroup(tabs.map(tab => tab.id))) : null,
        dispatch(setTabGroupName('')),
      ]));
  }
};
