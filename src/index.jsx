import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getState } from './chromeStorage';
import App from './components/app';
import tabbieApp from './reducers';

getState()
  .then((state) => {
    const store = createStore(tabbieApp, {
      controls: {
        saveSelected: state.saveSelected,
      },
    });
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('container'),
    );
  });
