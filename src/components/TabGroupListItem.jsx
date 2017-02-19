import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import { listItemStyle } from '../styles/list';
import linkStyle from '../styles/link';

const listItemNameStyle = {
  flexGrow: 1,
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
      { `${name} ` }
      <Link to={`/details/${tabGroupKey}`} style={linkStyle}>
        <small>{`(${tabs.length} Tabs)`}</small>
      </Link>
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
