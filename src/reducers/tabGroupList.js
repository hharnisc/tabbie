import {
  REMOVE_TAB_GROUP,
  ADD_TAB_GROUP,
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
    default:
      return state;
  }
};

export default tabGroupList;
