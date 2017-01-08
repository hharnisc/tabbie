import { combineReducers } from 'redux';
import controls from './controls';

const tabbieApp = combineReducers({
  controls,
});

export default tabbieApp;
