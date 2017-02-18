import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import titleStyle from '../styles/title';

const TabGroupDetailsView = ({
  tabGroup,
}) =>
  <div>
    <h1 style={titleStyle}>
      {tabGroup.name}
    </h1>
    <Link to={'/popup.html'}>back to tab groups</Link>
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
