import React, { PropTypes } from 'react';
import {
  buttonStyle,
  warningButtonStyle,
  hoveredButton,
} from '../styles/button';

const listItemStyle = {
  display: 'flex',
  padding: '0.5em 0',
};

const listItemNameStyle = {
  flexGrow: 1,
};

const TabGroupListItem = ({
  tabGroupKey,
  name,
  onRemoveClick,
  onOpenClick,
  tabs,
  onOpenMouseEnter,
  onOpenMouseLeave,
  openHovered,
}) =>
  <li style={listItemStyle}>
    <span style={listItemNameStyle}>{ name }</span>
    <button
      onMouseEnter={() => onOpenMouseEnter(tabGroupKey)}
      onMouseLeave={() => onOpenMouseLeave(tabGroupKey)}
      onClick={() => onOpenClick(tabs)}
      style={{ ...(openHovered ? hoveredButton : buttonStyle), marginLeft: 10 }}
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
  onOpenMouseEnter: PropTypes.func,
  onOpenMouseLeave: PropTypes.func,
  openHovered: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      pinned: PropTypes.bool,
      url: PropTypes.string,
    }),
  ),
};

export default TabGroupListItem;
