import React, { PropTypes } from 'react';
import parse from 'url-parse';
import Button from './Button';
import { listItemStyle } from '../styles/list';
import { grey } from '../styles/colors';

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

const urlPathStyle = {
  color: grey,
};

const renderUrl = (url) => {
  const parsedUrl = parse(url);
  const pathAndHash = `${parsedUrl.pathname}${parsedUrl.hash}` !== '/' ?
    (<div style={ellipsisStyle}>
      <small style={urlPathStyle}>{parsedUrl.pathname}{parsedUrl.hash}</small>
    </div>) : null;
  return (
    <div>
      <div style={ellipsisStyle}>{parsedUrl.protocol}{'//'}{parsedUrl.auth}{parsedUrl.host}</div>
      {pathAndHash}
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
