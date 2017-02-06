import { combineReducers } from 'redux';
import tabGroupList from './tabGroupList';
import tabGroupListControls from './tabGroupListControls';

const tabbieApp = combineReducers({
  tabGroupList,
  tabGroupListControls,
});

export default tabbieApp;
