import React, { PropTypes } from 'react';
import {
  buttonStyle,
  warningButtonStyle,
  hoveredButton,
  hoveredWarningButtonStyle,
} from '../styles/button';

const listItemStyle = {
  display: 'flex',
  padding: '0.5em 0',
};

const listItemNameStyle = {
  flexGrow: 1,
};

const tabCountStyle = {
  opacity: 0.7,
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
  onRemoveMouseEnter,
  onRemoveMouseLeave,
  removeHovered,
}) =>
  <li style={listItemStyle}>
    <span style={listItemNameStyle}>
      { name }
      <small style={tabCountStyle}>{` (${tabs.length} Tabs)`}</small>
    </span>
    <button
      onMouseEnter={() => onOpenMouseEnter(tabGroupKey)}
      onMouseLeave={() => onOpenMouseLeave(tabGroupKey)}
      onClick={() => onOpenClick(tabs)}
      style={{ ...(openHovered ? hoveredButton : buttonStyle), marginLeft: 10 }}
    >
      open
    </button>
    <button
      onMouseEnter={() => onRemoveMouseEnter(tabGroupKey)}
      onMouseLeave={() => onRemoveMouseLeave(tabGroupKey)}
      onClick={() => onRemoveClick(tabGroupKey)}
      style={{
        ...(removeHovered ? hoveredWarningButtonStyle : warningButtonStyle),
        marginLeft: 10,
      }}
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
  onRemoveMouseEnter: PropTypes.func,
  onRemoveMouseLeave: PropTypes.func,
  removeHovered: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      pinned: PropTypes.bool,
      url: PropTypes.string,
    }),
  ),
};

export default TabGroupListItem;
