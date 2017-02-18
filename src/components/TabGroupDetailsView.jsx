import React, { PropTypes } from 'react';
import titleStyle from '../styles/title';

const TabGroupDetailsView = ({
  tabGroup,
}) =>
  <div>
    <h1 style={titleStyle}>
      {tabGroup.name}
    </h1>
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
