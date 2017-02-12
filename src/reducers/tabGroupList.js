import {
  REMOVE_TAB_GROUP,
  ADD_TAB_GROUP,
  HOVER_TAB_GROUP_OPEN,
  UNHOVER_TAB_GROUP_OPEN,
  HOVER_TAB_GROUP_REMOVE,
  UNHOVER_TAB_GROUP_REMOVE,
  RESYNC_TAB_GROUPS,
} from '../actions';

const tabGroupList = (state = {
  tabGroups: [],
  openHoverStates: {},
  removeHoverStates: {},
}, action) => {
  switch (action.type) {
    case RESYNC_TAB_GROUPS:
      return {
        ...state,
        tabGroups: action.tabGroups,
      };
    case REMOVE_TAB_GROUP: {
      const removeHoverStates = { ...state.removeHoverStates };
      delete removeHoverStates[action.tabGroupKey];
      return {
        ...state,
        tabGroups: state.tabGroups.filter((tabGroup, i) => i !== action.tabGroupKey),
        removeHoverStates,
      };
    }
    case ADD_TAB_GROUP:
      return {
        ...state,
        tabGroups: [...state.tabGroups, { name: action.name, tabs: action.tabs }],
      };
    case HOVER_TAB_GROUP_OPEN: {
      const openHoverStates = { ...state.openHoverStates };
      openHoverStates[action.tabGroupKey] = true;
      return {
        ...state,
        openHoverStates,
      };
    }
    case UNHOVER_TAB_GROUP_OPEN: {
      const openHoverStates = { ...state.openHoverStates };
      delete openHoverStates[action.tabGroupKey];
      return {
        ...state,
        openHoverStates,
      };
    }
    case HOVER_TAB_GROUP_REMOVE: {
      const removeHoverStates = { ...state.removeHoverStates };
      removeHoverStates[action.tabGroupKey] = true;
      return {
        ...state,
        removeHoverStates,
      };
    }
    case UNHOVER_TAB_GROUP_REMOVE: {
      const removeHoverStates = { ...state.removeHoverStates };
      delete removeHoverStates[action.tabGroupKey];
      return {
        ...state,
        removeHoverStates,
      };
    }
    default:
      return state;
  }
};

export default tabGroupList;
