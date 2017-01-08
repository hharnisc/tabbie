import React, { PropTypes } from 'react';

const ListControls = ({ saveSelected = false }) =>
  <div>
    <input type="text" />
    <button>Save { saveSelected ? 'Selected' : 'All' } Tabs</button>
    <button>Save & Close { saveSelected ? 'Selected' : 'All' } Tabs</button>
    <label htmlFor="cb-save-selected-tabs">
      <input type="checkbox" id="cb-save-selected-tabs" checked={saveSelected} /> Only Save Selected Tabs
    </label>
  </div>;

ListControls.propTypes = {
  saveSelected: PropTypes.bool,
};

export default ListControls;
