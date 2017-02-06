import ua from 'universal-analytics';
import {
  ADD_TAB_GROUP,
  OPEN_TAB_GROUP,
  REMOVE_TAB_GROUP,
} from '../actions';

// track a page view
const ga = ua('UA-89553254-1');
ga.pageview('/').send();

const analytics = () => next => (action) => {
  switch (action.type) {
    case ADD_TAB_GROUP:
      ga.event({
        ec: 'TabGroup',
        ea: `save${action.close ? 'AndClose' : ''}`,
        ev: action.tabs.length,
      }).send();
      break;
    case OPEN_TAB_GROUP:
      ga.event({
        ec: 'TabGroup',
        ea: 'open',
        ev: action.tabs.length,
      }).send();
      break;
    case REMOVE_TAB_GROUP:
      ga.event('TabGroup', 'remove').send();
      ga.event({
        ec: 'TabGroup',
        ea: 'open',
      }).send();
      break;
    default:
      break;
  }
  return next(action);
};


export default analytics;
