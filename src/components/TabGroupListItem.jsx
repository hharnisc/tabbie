import React, { PropTypes } from 'react';

const TabGroupListItem = ({ name, onRemoveClick }) =>
  <div>
    { name }
    <button>Open</button>
    <button onClick={onRemoveClick}>Remove</button>
  </div>;

TabGroupListItem.propTypes = {
  name: PropTypes.string,
  onRemoveClick: PropTypes.func,
};

export default TabGroupListItem;
