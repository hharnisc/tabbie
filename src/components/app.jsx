import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import TabGroupListView from './TabGroupListView';

const appStyle = {
  padding: '2em',
  height: '40em',
  width: '30em',
  boxSizing: 'border-box',
};

export default () =>
  <div style={appStyle}>
    <Router history={browserHistory}>
      <Route path="/popup.html" component={TabGroupListView} />
    </Router>
  </div>;
