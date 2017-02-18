import React, { PropTypes } from 'react';
import { listItemStyle } from '../styles/list';

const TabGroupDetailsItem = ({ pinned, url }) =>
  <li style={listItemStyle}>
    {url} - pinned: {`${pinned}`}
  </li>;

TabGroupDetailsItem.propTypes = {
  pinned: PropTypes.bool,
  url: PropTypes.string,
};

export default TabGroupDetailsItem;
