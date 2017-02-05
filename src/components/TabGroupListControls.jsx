import React, { PropTypes } from 'react';
import {
  inputStyle,
  inputErrorStyle,
} from '../styles/input';
import {
  buttonStyle,
  primaryButtonStyle,
  hoveredButton,
} from '../styles/button';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const formInputStyle = {
  margin: '1em 0',
};

const formButtonStyle = {
  padding: '1em',
  marginTop: '1em',
};

const formCheckboxStyle = {
  marginTop: '1em',
};

const ListControls = ({
  onClickSetSaveSelected,
  onTabGroupNameChange,
  onSaveTabGroupClick,
  saveSelected,
  tabGroupError,
  tabGroupName,
  onSaveAndCloseMouseEnter,
  onSaveAndCloseMouseLeave,
  saveAndCloseHovered,
}) =>
  <form style={formStyle}>
    <label htmlFor={'input-tab-group-name'}>
      <strong>New Tab Group Name</strong>
    </label>
    <input
      id="input-tab-group-name"
      onChange={onTabGroupNameChange}
      placeholder={'Ex. Yesterday\'s Work'}
      value={tabGroupName}
      style={tabGroupError ?
        { ...inputErrorStyle, ...formInputStyle } :
        { ...inputStyle, ...formInputStyle }
      }
    />
    <button
      onClick={(e) => {
        e.preventDefault();
        onSaveTabGroupClick({ tabGroupName, saveSelected, close: false });
      }}
      style={{ ...primaryButtonStyle, ...formButtonStyle }}
    >
      Save { saveSelected ? 'Selected' : 'All' } Tabs
    </button>
    <button
      onMouseEnter={onSaveAndCloseMouseEnter}
      onMouseLeave={onSaveAndCloseMouseLeave}
      onClick={(e) => {
        e.preventDefault();
        onSaveTabGroupClick({ tabGroupName, saveSelected, close: true });
      }}
      style={{
        ...(saveAndCloseHovered ? hoveredButton : buttonStyle),
        ...formButtonStyle,
      }}
    >
      Save & Close { saveSelected ? 'Selected' : 'All' } Tabs
    </button>
    <label
      style={formCheckboxStyle}
      htmlFor={'cb-save-selected-tabs'}
    >
      <input
        type={'checkbox'}
        id={'cb-save-selected-tabs'}
        checked={saveSelected}
        onClick={() => onClickSetSaveSelected(!saveSelected)}
        readOnly
      /> Only Save Selected Tabs
    </label>
  </form>;

ListControls.propTypes = {
  onTabGroupNameChange: PropTypes.func,
  onClickSetSaveSelected: PropTypes.func.isRequired,
  onSaveTabGroupClick: PropTypes.func,
  saveSelected: PropTypes.bool.isRequired,
  tabGroupError: PropTypes.bool,
  tabGroupName: PropTypes.string,
  onSaveAndCloseMouseEnter: PropTypes.func,
  onSaveAndCloseMouseLeave: PropTypes.func,
  saveAndCloseHovered: PropTypes.bool,
};

export default ListControls;
