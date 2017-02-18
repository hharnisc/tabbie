import React from 'react';
import TabGroupListView from './TabGroupListView';

const appStyle = {
  padding: '2em',
  height: '40em',
  width: '30em',
  boxSizing: 'border-box',
};

export default () =>
  <div style={appStyle}>
    <TabGroupListView />
  </div>;
