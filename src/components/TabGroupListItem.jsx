import React, { PropTypes } from 'react';

const TabGroupListItem = ({ name, onRemoveClick, onOpenClick }) =>
  <div>
    { name }
    <button onClick={onOpenClick}>Open</button>
    <button onClick={onRemoveClick}>Remove</button>
  </div>;

TabGroupListItem.propTypes = {
  name: PropTypes.string,
  onRemoveClick: PropTypes.func,
  onOpenClick: PropTypes.func,
};

export default TabGroupListItem;
