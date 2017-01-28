import React, { PropTypes } from 'react';
import TabGroupListItem from '../containers/TabGroupListItem';
import TabGroupListEmpty from './TabGroupListEmpty';

const TabGroupList = ({ tabGroups }) =>
  <div>
    {
      tabGroups.length ?
        tabGroups.map((tabGroup, i) =>
          <TabGroupListItem {...tabGroup} tabGroupKey={i} key={i} />) :
        <TabGroupListEmpty />
    }
  </div>;

TabGroupList.propTypes = {
  tabGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

export default TabGroupList;
