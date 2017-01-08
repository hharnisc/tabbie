import React, { PropTypes } from 'react';
import TabGroupListItem from './TabGroupListItem';
import TabGroupListEmpty from './TabGroupListEmpty';

const TabGroupList = ({ tabGroups }) =>
  <div>
    {
      tabGroups.length ?
        tabGroups.map(tabGroup => <TabGroupListItem {...tabGroup} />) :
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
