import {
  SET_SAVE_SELECTED,
  SET_TAB_GROUP_NAME,
  SET_TAB_GROUP_ERROR,
  SET_SAVE_AND_CLOSE_HOVER_STATE,
} from '../actions';

const tabGroupListControls = (state = {
  saveSelected: false,
  tabGroupName: '',
  tabGroupError: false,
  saveAndCloseHovered: false,
}, action) => {
  switch (action.type) {
    case SET_SAVE_SELECTED:
      return { ...state, saveSelected: action.saveSelected };
    case SET_TAB_GROUP_NAME:
      return { ...state, tabGroupName: action.tabGroupName };
    case SET_TAB_GROUP_ERROR:
      return { ...state, tabGroupError: action.tabGroupError };
    case SET_SAVE_AND_CLOSE_HOVER_STATE:
      return { ...state, saveAndCloseHovered: action.isHovering };
    default:
      return state;
  }
};

export default tabGroupListControls;
