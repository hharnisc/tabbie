import {
  createTabs,
  closeTabsWithIds,
} from '../tabManager';
import {
  CLOSE_TAB_GROUP,
  OPEN_TAB_GROUP,
} from '../actions';

const tabManager = () => next => (action) => {
  switch (action.type) {
    case CLOSE_TAB_GROUP:
      closeTabsWithIds(action.tabIds);
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
