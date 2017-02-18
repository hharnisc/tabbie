import React, { PropTypes } from 'react';
import Button from './Button';

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
  onOpenClick,
  onRemoveClick,
  tabs,
}) =>
  <li style={listItemStyle}>
    <span style={listItemNameStyle}>
      { name }
      <small style={tabCountStyle}>{` (${tabs.length} Tabs)`}</small>
    </span>
    <span style={{ marginLeft: 10 }}>
      <Button
        hoverId={`tab-group-list-item/open-${tabGroupKey}`}
        onClick={() => onOpenClick(tabs)}
      >
        open
      </Button>
    </span>
    <span style={{ marginLeft: 10 }}>
      <Button
        hoverId={`tab-group-list-item/remove-${tabGroupKey}`}
        onClick={() => onRemoveClick(tabGroupKey)}
        type={'warning'}
      >
          remove
        </Button>
    </span>
  </li>;

TabGroupListItem.propTypes = {
  tabGroupKey: PropTypes.number,
  name: PropTypes.string,
  onOpenClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      pinned: PropTypes.bool,
      url: PropTypes.string,
    }),
  ),
};

export default TabGroupListItem;
