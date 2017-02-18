import React, { PropTypes } from 'react';
import parse from 'url-parse';
import { blue } from '../styles/colors';
import { listItemStyle } from '../styles/list';

const urlStyle = {
  flexGrow: 1,
};

const iconStyle = {
  width: '1.5em',
  minWidth: '1.5em',
  height: '1.5em',
  minHeight: '1.5em',
  marginRight: '1em',
};

const customListStyle = {
  alignItems: 'center',
};

const renderPinned = () =>
  <div>
    <svg viewBox={'0 0 160 160'} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'} style={iconStyle}>
      <path fill={blue} fillRule={'evenodd'} d={'M 80 160C 124.183 160 160 124.183 160 80C 160 35.8172 124.183 0 80 0C 35.8172 0 0 35.8172 0 80C 0 124.183 35.8172 160 80 160ZM 59.4632 30.4521C 59.0184 29.888 58.3523 29.5424 57.635 29.5036C 56.9176 29.4649 56.2182 29.7366 55.7151 30.2495L 30.2151 56.2495C 29.7209 56.7534 29.4627 57.4428 29.5043 58.1474C 29.546 58.852 29.8835 59.5062 30.4336 59.9484L 54.6181 79.3909C 52.7505 85.9676 52.8047 91.2204 54.5927 96.0547C 56.4772 101.15 60.1941 105.479 64.6851 110.219C 65.1474 110.707 65.7866 110.989 66.4586 111C 67.1307 111.011 67.7789 110.751 68.257 110.278L 82.8667 95.8448L 125.934 130.449C 126.922 131.242 128.347 131.172 129.251 130.284C 130.155 129.397 130.253 127.973 129.478 126.971L 95.6432 83.2222L 109.757 69.2785C 110.73 68.3168 110.75 66.7515 109.801 65.7659C 103.262 58.976 98.4485 55.3283 93.3936 54.0522C 88.789 52.8897 84.3177 53.8021 78.9536 55.1716L 59.4632 30.4521ZM 112.601 113.322L 86.447 92.3076L 92.0601 86.7621L 112.601 113.322ZM 59.0664 76.5516L 35.717 57.7805L 57.2957 35.7787L 76.0368 59.5479L 77.0483 60.8308L 78.6294 60.4195C 84.9641 58.7716 88.5743 57.9924 92.1697 58.9001C 95.4285 59.7227 99.0056 62.0371 104.469 67.4739L 90.554 81.2215L 80.9381 90.7216L 66.5734 104.913C 63.0168 101.026 60.5721 97.8075 59.2823 94.3203C 57.8429 90.4286 57.7466 85.9024 59.8801 79.265L 60.4061 77.6286L 59.0664 76.5516Z'} />
    </svg>
  </div>;

const renderNotPinned = () => <div style={iconStyle} />;

const renderUrl = (url) => {
  const parsedUrl = parse(url);
  return (
    <div style={urlStyle}>
      <div>{parsedUrl.protocol}{'//'}{parsedUrl.auth}{parsedUrl.host}</div>
      <div>
        <small>{parsedUrl.pathname}{parsedUrl.hash}</small>
      </div>
    </div>
  );
};

const TabGroupDetailsItem = ({ pinned, url }) =>
  <li style={{ ...listItemStyle, ...customListStyle }}>
    {pinned ? renderPinned() : renderNotPinned()}
    {renderUrl(url)}
  </li>;

TabGroupDetailsItem.propTypes = {
  pinned: PropTypes.bool,
  url: PropTypes.string,
};

export default TabGroupDetailsItem;
