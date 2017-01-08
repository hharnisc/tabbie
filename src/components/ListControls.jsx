import React, { PropTypes } from 'react';

const ListControls = ({ onClickSetSaveSelected, saveSelected }) =>
  <div>
    <input type="text" />
    <button>Save { saveSelected ? 'Selected' : 'All' } Tabs</button>
    <button>Save & Close { saveSelected ? 'Selected' : 'All' } Tabs</button>
    <label htmlFor="cb-save-selected-tabs">
      <input
        type="checkbox"
        id="cb-save-selected-tabs"
        checked={saveSelected}
        onClick={() => onClickSetSaveSelected(!saveSelected)}
        readOnly
      /> Only Save Selected Tabs
    </label>
  </div>;

ListControls.propTypes = {
  onClickSetSaveSelected: PropTypes.func.isRequired,
  saveSelected: PropTypes.bool.isRequired,
};

export default ListControls;
