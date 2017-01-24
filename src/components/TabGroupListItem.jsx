import React, { PropTypes } from 'react';

const TabGroupListItem = ({ name }) =>
  <div>
    { name }
    <button>Open</button>
    <button>Remove</button>
  </div>;

TabGroupListItem.propTypes = {
  name: PropTypes.string,
};

export default TabGroupListItem;
