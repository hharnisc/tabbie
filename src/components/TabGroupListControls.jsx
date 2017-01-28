import React, { PropTypes } from 'react';

const ListControls = ({
  onClickSetSaveSelected,
  onTabGroupNameChange,
  onSaveTabGroupClick,
  saveSelected,
  tabGroupError,
  tabGroupName,
}) =>
  <div>
    <input
      type="text"
      onChange={onTabGroupNameChange}
      value={tabGroupName}
      style={{
        borderColor: tabGroupError ? 'red' : undefined,
      }}
    />
    <button
      onClick={() => onSaveTabGroupClick({ tabGroupName, saveSelected, close: false })}
    >
      Save { saveSelected ? 'Selected' : 'All' } Tabs
    </button>
    <button
      onClick={() => onSaveTabGroupClick({ tabGroupName, saveSelected, close: true })}
    >
      Save & Close { saveSelected ? 'Selected' : 'All' } Tabs
    </button>
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
  onSaveTabGroupClick: PropTypes.func,
  saveSelected: PropTypes.bool.isRequired,
  tabGroupError: PropTypes.bool,
  tabGroupName: PropTypes.string,
};

export default ListControls;
