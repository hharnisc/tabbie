import React, { PropTypes } from 'react';
import Button from './Button';
import {
  inputStyle,
  inputErrorStyle,
} from '../styles/input';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const formInputStyle = {
  margin: '1em 0',
};

const formButtonStyle = {
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
    <span style={formButtonStyle}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          onSaveTabGroupClick({ tabGroupName, saveSelected, close: false });
        }}
        type={'primary'}
        fullWidth
      >
        Save { saveSelected ? 'Selected' : 'All' } Tabs
      </Button>
    </span>
    <span style={formButtonStyle}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          onSaveTabGroupClick({ tabGroupName, saveSelected, close: true });
        }}
        hoverId={'tab-group-list-controls/save-and-close'}
        fullWidth
      >
        Save & Close { saveSelected ? 'Selected' : 'All' } Tabs
      </Button>
    </span>
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
};

export default ListControls;
