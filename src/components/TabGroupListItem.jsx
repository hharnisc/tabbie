import React, { PropTypes } from 'react';
import {
  buttonStyle,
  warningButtonStyle,
} from '../styles/button';

const listItemStyle = {
  display: 'flex',
  padding: '0.5em 0',
};

const listItemNameStyle = {
  flexGrow: 1,
};

const TabGroupListItem = ({ tabGroupKey, name, onRemoveClick, onOpenClick, tabs }) =>
  <li style={listItemStyle}>
    <span style={listItemNameStyle}>{ name }</span>
    <button
      onClick={() => onOpenClick(tabs)}
      style={{ ...buttonStyle, marginLeft: 10 }}
    >
      open
    </button>
    <button
      onClick={() => onRemoveClick(tabGroupKey)}
      style={{ ...warningButtonStyle, marginLeft: 10 }}
    >
      remove
    </button>
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
