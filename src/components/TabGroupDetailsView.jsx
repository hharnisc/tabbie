import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TabGroupDetailsItem from './TabGroupDetailsItem';
import titleStyle from '../styles/title';

const titleBarStyle = {
  display: 'flex',
  alignItems: 'baseline',
};

const titleCustomStyle = {
  flexGrow: 1,
};

const TabGroupDetailsView = ({
  tabGroup,
}) =>
  <div>
    <div style={titleBarStyle}>
      <h1 style={{ ...titleStyle, ...titleCustomStyle }}>
        {tabGroup.name}
      </h1>
      <Link to={'/popup.html'}>back to tab groups</Link>
    </div>
    {tabGroup.tabs.map((tab, i) =>
      <TabGroupDetailsItem pinned={tab.pinned} url={tab.url} key={i} />)}
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
