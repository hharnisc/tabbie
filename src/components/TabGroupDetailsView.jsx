import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TabGroupDetailsItem from './TabGroupDetailsItem';
import titleStyle from '../styles/title';
import { listStyle } from '../styles/list';

const titleBarStyle = {
  display: 'flex',
  alignItems: 'baseline',
};

const titleCustomStyle = {
  flexGrow: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const wrapperStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = {
  whiteSpace: 'nowrap',
};

const TabGroupDetailsView = ({
  tabGroup,
}) =>
  <div style={wrapperStyle}>
    <div style={titleBarStyle}>
      <h1 style={{ ...titleStyle, ...titleCustomStyle }}>
        {tabGroup.name}
      </h1>
      <Link to={'/popup.html'} style={linkStyle}>« back</Link>
    </div>
    <div>
      <ul style={{ ...listStyle }}>
        {tabGroup.tabs.map((tab, i) =>
          <TabGroupDetailsItem pinned={tab.pinned} url={tab.url} key={i} />)}
      </ul>
    </div>
  </div>;

TabGroupDetailsView.propTypes = {
  tabGroup: PropTypes.shape({
    name: PropTypes.string,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        pinned: PropTypes.bool,
        url: PropTypes.string,
      }),
    ),
  }),
};

export default TabGroupDetailsView;
