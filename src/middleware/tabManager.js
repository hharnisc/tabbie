import {
  closeTabsWithIds,
} from '../tabManager';
import {
  ADD_TAB_GROUP,
} from '../actions';

const tabManager = () => next => (action) => {
  switch (action.type) {
    case ADD_TAB_GROUP:
      if (action.close) {
        console.log('action', action);
        closeTabsWithIds(action.tabIds);
      }
      break;
    default:
      break;
  }
  return next(action);
};


export default tabManager;
