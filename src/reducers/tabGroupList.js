import {
  REMOVE_TAB_GROUP,
  ADD_TAB_GROUP,
  HOVER_TAB_GROUP_OPEN,
  UNHOVER_TAB_GROUP_OPEN,
} from '../actions';

const tabGroupList = (state = [], action) => {
  switch (action.type) {
    case REMOVE_TAB_GROUP:
      return {
        ...state,
        tabGroups: state.tabGroups.filter((tabGroup, i) => i !== action.tabGroupKey),
      };
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
    default:
      return state;
  }
};

export default tabGroupList;
