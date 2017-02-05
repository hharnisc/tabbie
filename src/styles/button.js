import {
  red,
  blue,
} from './colors';

export const buttonStyle = {
  background: '#fff',
  borderRadius: '3px',
  border: 'none',
  color: blue,
  padding: '0.5em',
};

export const warningButtonStyle = {
  ...buttonStyle,
  color: red,
};
