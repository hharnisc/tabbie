import React from 'react';
import TabGroupList from '../containers/TabGroupList';
import TabGroupListControls from '../containers/TabGroupListControls';

const appStyle = {
  padding: '1em',
};

const titleStyle = {
  marginTop: 0,
};

export default () =>
  <div style={appStyle}>
    <h1 style={titleStyle}>
      Saved Tab Groups
    </h1>
    <TabGroupList />
    <TabGroupListControls />
  </div>;
