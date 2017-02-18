import {
  REMOVE_TAB_GROUP,
  ADD_TAB_GROUP,
  RESYNC_TAB_GROUPS,
} from '../actions';

const tabGroupList = (state = { tabGroups: [] }, action) => {
  switch (action.type) {
    case RESYNC_TAB_GROUPS:
      return {
        ...state,
        tabGroups: action.tabGroups,
      };
    case REMOVE_TAB_GROUP: {
      return {
        ...state,
        tabGroups: state.tabGroups.filter((tabGroup, i) => i !== action.tabGroupKey),
      };
    }
    case ADD_TAB_GROUP:
      return {
        ...state,
        tabGroups: [...state.tabGroups, { name: action.name, tabs: action.tabs }],
      };
    default:
      return state;
  }
};

export default tabGroupList;
