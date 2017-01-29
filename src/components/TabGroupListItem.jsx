import React, { PropTypes } from 'react';

const listItemStyle = {
  display: 'flex',
  padding: '0.5em 0',
};

const listItemName = {
  flexGrow: 1,
};

const TabGroupListItem = ({ tabGroupKey, name, onRemoveClick, onOpenClick, tabs }) =>
  <li style={listItemStyle}>
    <span style={listItemName}>{ name }</span>
    <button onClick={() => onOpenClick(tabs)}>Open</button>
    <button onClick={() => onRemoveClick(tabGroupKey)}>Remove</button>
  </li>;

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
