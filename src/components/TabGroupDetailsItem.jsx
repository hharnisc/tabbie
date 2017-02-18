import React, { PropTypes } from 'react';
import parse from 'url-parse';
import Button from './Button';
import { listItemStyle } from '../styles/list';

const urlStyle = {
  flexGrow: 1,
  marginRight: '1em',
};

const customListStyle = {
  alignItems: 'center',
};

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const renderUrl = (url) => {
  const parsedUrl = parse(url);
  return (
    <div>
      <div style={ellipsisStyle}>{parsedUrl.protocol}{'//'}{parsedUrl.auth}{parsedUrl.host}</div>
      <div style={ellipsisStyle}>
        <small>{parsedUrl.pathname}{parsedUrl.hash}</small>
      </div>
    </div>
  );
};

const renderPinned = () =>
  <div>
    <Button type={'primary'}>pinned</Button>
  </div>;

const TabGroupDetailsItem = ({ pinned, url }) =>
  <li style={{ ...listItemStyle, ...customListStyle }}>
    <div style={{ ...urlStyle, ...ellipsisStyle }}>
      {renderUrl(url, pinned)}
    </div>
    {pinned ? renderPinned() : null}
  </li>;

TabGroupDetailsItem.propTypes = {
  pinned: PropTypes.bool,
  url: PropTypes.string,
};

export default TabGroupDetailsItem;
