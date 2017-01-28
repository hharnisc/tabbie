import {
  SET_SAVE_SELECTED,
  TAB_GROUP_NAME_CHANGE,
} from '../actions';

const tabGroupListControls = (state = { saveSelected: false, tabGroupName: '' }, action) => {
  switch (action.type) {
    case SET_SAVE_SELECTED:
      return { ...state, saveSelected: action.saveSelected };
    case TAB_GROUP_NAME_CHANGE:
      return { ...state, tabGroupName: action.tabGroupName };
    default:
      return state;
  }
};

export default tabGroupListControls;
