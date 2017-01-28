import {
  SET_SAVE_SELECTED,
  TAB_GROUP_NAME_CHANGE,
  SET_TAB_GROUP_ERROR,
} from '../actions';

const tabGroupListControls = (state = {
  saveSelected: false,
  tabGroupName: '',
  tabGroupError: false,
}, action) => {
  switch (action.type) {
    case SET_SAVE_SELECTED:
      return { ...state, saveSelected: action.saveSelected };
    case TAB_GROUP_NAME_CHANGE:
      return { ...state, tabGroupName: action.tabGroupName };
    case SET_TAB_GROUP_ERROR:
      return { ...state, tabGroupError: action.tabGroupError };
    default:
      return state;
  }
};

export default tabGroupListControls;
