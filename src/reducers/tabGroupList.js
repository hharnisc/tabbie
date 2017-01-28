import { REMOVE_TAB_GROUP } from '../actions';

const tabGroupList = (state = [], action) => {
  switch (action.type) {
    case REMOVE_TAB_GROUP:
      console.log('filtered tabGroups', state.tabGroups.filter((tabGroup, i) => i !== action.tabGroupKey));
      return {
        tabGroups: state.tabGroups.filter((tabGroup, i) => i !== action.tabGroupKey),
      };
    default:
      return state;
  }
};

export default tabGroupList;
