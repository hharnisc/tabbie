import React, { PropTypes } from 'react';

const ListControls = ({
  onClickSetSaveSelected,
  onTabGroupNameChange,
  saveSelected,
  tabGroupName,
}) =>
  <div>
    <input type="text" onChange={onTabGroupNameChange} value={tabGroupName} />
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
  onTabGroupNameChange: PropTypes.func,
  onClickSetSaveSelected: PropTypes.func.isRequired,
  saveSelected: PropTypes.bool.isRequired,
  tabGroupName: PropTypes.string,
};

export default ListControls;
