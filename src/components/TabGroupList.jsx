import React, { PropTypes } from 'react';

const TabGroupList = ({ tabGroups }) =>
  <div>{tabGroups.length}</div>;

TabGroupList.propTypes = {
  tabGroups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

export default TabGroupList;
