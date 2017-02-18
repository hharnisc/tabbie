import {
  SET_SAVE_SELECTED,
  SET_TAB_GROUP_NAME,
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
    case SET_TAB_GROUP_NAME:
      return { ...state, tabGroupName: action.tabGroupName };
    case SET_TAB_GROUP_ERROR:
      return { ...state, tabGroupError: action.tabGroupError };
    default:
      return state;
  }
};

export default tabGroupListControls;
