import React from 'react';
import TabGroupList from '../containers/TabGroupList';
import TabGroupListControls from '../containers/TabGroupListControls';
import titleStyle from '../styles/title';

const tabGroupListStyle = {
  flexGrow: 1,
  maxHeight: '17em',
  overflowY: 'auto',
};

const wrapperStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const TabGroupListView = () =>
  <div style={wrapperStyle}>
    <h1 style={titleStyle}>
      Saved Tab Groups
    </h1>
    <div style={tabGroupListStyle}>
      <TabGroupList />
    </div>
    <TabGroupListControls />
  </div>;

export default TabGroupListView;
