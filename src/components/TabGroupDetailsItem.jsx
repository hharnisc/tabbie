import React, { PropTypes } from 'react';

const TabGroupDetailsItem = ({ pinned, url }) =>
  <div>{url} - pinned: {`${pinned}`}</div>;

TabGroupDetailsItem.propTypes = {
  pinned: PropTypes.bool,
  url: PropTypes.string,
};

export default TabGroupDetailsItem;
