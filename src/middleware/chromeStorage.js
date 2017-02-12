import { setState } from '../chromeStorage';
import {
  ADD_TAB_GROUP,
  REMOVE_TAB_GROUP,
} from '../actions';

const chromeStorage = store => next => (action) => {
  switch (action.type) {
    case ADD_TAB_GROUP:
    console.log('store.getState()', store.getState());
      setState({
        tabGroups: [
          ...store.getState().tabGroupList.tabGroups,
          { name: action.name, tabs: action.tabs },
        ],
      });
      break;
    case REMOVE_TAB_GROUP:
      break;
    default:
      break;
  }
  return next(action);
};


export default chromeStorage;
