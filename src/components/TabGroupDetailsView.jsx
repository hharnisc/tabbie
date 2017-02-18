import React, { PropTypes } from 'react';

const TabGroupDetails = ({
  tabGroup,
}) => <div>{JSON.stringify(tabGroup, null, 2)}</div>;

TabGroupDetails.propTypes = {
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

export default TabGroupDetails;
