import React, { PropTypes } from 'react';

const TabGroupListItem = ({ name, onRemoveClick, onOpenClick, tabs }) =>
  <div>
    { name }
    <button onClick={() => onOpenClick(tabs)}>Open</button>
    <button onClick={onRemoveClick}>Remove</button>
  </div>;

TabGroupListItem.propTypes = {
  name: PropTypes.string,
  onRemoveClick: PropTypes.func,
  onOpenClick: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      pinned: PropTypes.bool,
      url: PropTypes.string,
    }),
  ),
};

export default TabGroupListItem;
