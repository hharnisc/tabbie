import React from 'react';
import TabGroupList from '../containers/TabGroupList';
import TabGroupListControls from '../containers/TabGroupListControls';

const style = {
  height: '40em',
  width: '30em',
  padding: '1em',
};

export default () =>
  <div style={style}>
    <h2>Saved Tab Groups</h2>
    <TabGroupList />
    <TabGroupListControls />
  </div>;
