import React from 'react';
import TabGroupList from '../containers/TabGroupList';
import TabGroupListControls from '../containers/TabGroupListControls';

export default () =>
  <div>
    <h2>Saved Tab Groups</h2>
    <TabGroupList />
    <TabGroupListControls />
  </div>;
