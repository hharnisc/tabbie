import { combineReducers } from 'redux';
import tabGroupList from './tabGroupList';
import tabGroupListControls from './tabGroupListControls';
import analytics from './analytics';

const tabbieApp = combineReducers({
  analytics,
  tabGroupList,
  tabGroupListControls,
});

export default tabbieApp;
