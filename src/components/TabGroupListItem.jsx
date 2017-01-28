import React, { PropTypes } from 'react';

const TabGroupListItem = ({ tabGroupKey, name, onRemoveClick, onOpenClick, tabs }) =>
  <div>
    { name }
    <button onClick={() => onOpenClick(tabs)}>Open</button>
    <button onClick={() => onRemoveClick(tabGroupKey)}>Remove</button>
  </div>;

TabGroupListItem.propTypes = {
  tabGroupKey: PropTypes.number,
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
