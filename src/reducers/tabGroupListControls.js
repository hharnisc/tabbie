import {
  SET_SAVE_SELECTED,
  TAB_GROUP_NAME_CHANGE,
} from '../actions';

const tabGroupListControls = (state = { saveSelected: false, tabGroupName: '' }, action) => {
  switch (action.type) {
    case SET_SAVE_SELECTED:
      return {
        saveSelected: action.saveSelected,
      };
    case TAB_GROUP_NAME_CHANGE:
      return {
        tabGroupName: action.tabGroupName,
      };
    default:
      return state;
  }
};

export default tabGroupListControls;
