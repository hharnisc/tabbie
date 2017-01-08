import React, { PropTypes } from 'react';

const TabGroupListItem = ({ name }) =>
  <div>{ name }</div>;

TabGroupListItem.propTypes = {
  name: PropTypes.string,
};

export default TabGroupListItem;
