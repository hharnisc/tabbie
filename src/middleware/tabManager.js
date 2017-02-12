import {
  createTabs,
  closeTabsWithIds,
} from '../tabManager';
import {
  ADD_TAB_GROUP,
  OPEN_TAB_GROUP,
} from '../actions';

const tabManager = () => next => (action) => {
  switch (action.type) {
    case ADD_TAB_GROUP:
      if (action.close) {
        closeTabsWithIds(action.tabIds);
      }
      break;
    case OPEN_TAB_GROUP:
      createTabs(action.tabs);
      break;
    default:
      break;
  }
  return next(action);
};


export default tabManager;
