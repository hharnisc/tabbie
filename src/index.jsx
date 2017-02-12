import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/app';
import tabbieApp from './reducers';
import analytics from './middleware/analytics';
import chromeStorage from './middleware/chromeStorage';
import tabManager from './middleware/tabManager';

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(tabbieApp, applyMiddleware(
    thunk,
    analytics,
    chromeStorage,
    tabManager,
  ));
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container'),
  );
});
