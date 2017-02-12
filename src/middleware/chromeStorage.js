import { setState } from '../chromeStorage';
import {
  ADD_TAB_GROUP,
  REMOVE_TAB_GROUP,
  SET_SAVE_SELECTED,
} from '../actions';

const chromeStorage = store => next => (action) => {
  switch (action.type) {
    case ADD_TAB_GROUP:
      setState({
        tabGroups: [
          ...store.getState().tabGroupList.tabGroups,
          { name: action.name, tabs: action.tabs },
        ],
      });
      break;
    case REMOVE_TAB_GROUP:
      setState({
        tabGroups:
          store.getState().tabGroupList.tabGroups
            .filter((tabGroup, i) => i !== action.tabGroupKey),
      });
      break;
    case SET_SAVE_SELECTED:
      setState({ saveSelected: action.saveSelected });
      break;
    default:
      break;
  }
  return next(action);
};


export default chromeStorage;
