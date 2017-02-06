import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { getState } from './chromeStorage';
import App from './components/app';
import tabbieApp from './reducers';
import analytics from './middleware/analytics';

getState()
  .then((state) => {
    const initialState = {
      tabGroupListControls: {
        saveSelected: state.saveSelected || false,
        tabGroupName: '',
      },
      tabGroupList: {
        tabGroups: state.tabGroups || [],
        openHoverStates: {},
        removeHoverStates: {},
      },
    };
    const store = createStore(tabbieApp, initialState, applyMiddleware(thunk, analytics));
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('container'),
    );
  });
