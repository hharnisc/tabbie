import { combineReducers } from 'redux';
import { reducer as hover } from '@bufferapp/redux-hover';
import tabGroupList from './tabGroupList';
import tabGroupListControls from './tabGroupListControls';

const tabbieApp = combineReducers({
  hover,
  tabGroupList,
  tabGroupListControls,
});

export default tabbieApp;
