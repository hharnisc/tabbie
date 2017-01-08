import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
import tabbieApp from './reducers';

const store = createStore(tabbieApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
