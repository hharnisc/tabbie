/* eslint-disable no-undef*/
// use global scoped google analytics since it doesn't mark every user as new
import {
  ADD_TAB_GROUP,
  OPEN_TAB_GROUP,
  REMOVE_TAB_GROUP,
  SCREEN_VIEW,
} from '../actions';

const analytics = () => next => (action) => {
  switch (action.type) {
    case ADD_TAB_GROUP:
      ga('send', {
        hitType: 'event',
        eventCategory: 'TabGroup',
        eventAction: `save${action.close ? 'AndClose' : ''}`,
        eventValue: action.tabs.length,
      });
      break;
    case OPEN_TAB_GROUP:
      ga('send', {
        hitType: 'event',
        eventCategory: 'TabGroup',
        eventAction: 'open',
        eventValue: action.tabs.length,
      });
      break;
    case REMOVE_TAB_GROUP:
      ga('send', {
        hitType: 'event',
        eventCategory: 'TabGroup',
        eventAction: 'remove',
      });
      break;
    case SCREEN_VIEW:
      ga('send', {
        hitType: 'screenView',
        appName: 'Tabbie',
        appVersion: chrome.runtime.getManifest().version,
        screenName: action.screen,
      });
      break;
    default:
      break;
  }
  return next(action);
};


export default analytics;
