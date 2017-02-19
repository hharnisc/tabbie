import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import TabGroupListView from './components/TabGroupListView';
import TabGroupDetailsView from './containers/TabGroupDetailsView';
import tabbieApp from './reducers';
import analytics from './middleware/analytics';
import chromeStorage from './middleware/chromeStorage';
import tabManager from './middleware/tabManager';
import { screenView } from './actions';

const appStyle = {
  padding: '2em',
  height: '40em',
  width: '30em',
  boxSizing: 'border-box',
};

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(tabbieApp, applyMiddleware(
    thunk,
    analytics,
    chromeStorage,
    tabManager,
  ));
  render(
    <Provider store={store}>
      <div style={appStyle}>
        <Router history={browserHistory}>
          <Route
            path="/details/:tabGroupKey"
            component={TabGroupDetailsView}
            onEnter={() => store.dispatch(screenView('TabGroupDetails'))}
          />
          <Route
            path="*"
            component={TabGroupListView}
            onEnter={() => store.dispatch(screenView('TabGroupList'))}
          />
        </Router>
      </div>
    </Provider>,
    document.getElementById('container'),
  );
});
