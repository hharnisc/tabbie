import React, { PropTypes } from 'react';
import TabGroupListItem from '../containers/TabGroupListItem';
import TabGroupListEmpty from './TabGroupListEmpty';

const listStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const TabGroupList = ({ tabGroups }) =>
  <ul style={listStyle}>
    {
      tabGroups.length ?
        tabGroups.map((tabGroup, i) =>
          <TabGroupListItem {...tabGroup} tabGroupKey={i} key={i} />) :
        <TabGroupListEmpty />
    }
  </ul>;

TabGroupList.propTypes = {
  tabGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

export default TabGroupList;
