import {
  red,
  blue,
  white,
} from './colors';

export const buttonStyle = {
  background: white,
  borderRadius: '3px',
  border: 'none',
  color: blue,
  fontSize: '0.9em',
  padding: '0.5em',
};

export const warningButtonStyle = {
  ...buttonStyle,
  color: red,
};

export const primaryButtonStyle = {
  ...buttonStyle,
  background: blue,
  color: white,
};

export const hoveredButton = { ...primaryButtonStyle };

export const hoveredWarningButtonStyle = {
  ...buttonStyle,
  background: red,
  color: white,
};

export const fullWidth = {
  width: '100%',
  padding: '1em',
};
