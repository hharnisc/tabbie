import {
  red,
} from './colors';

export const inputStyle = {
  border: '1px solid #808080',
  boxSizing: 'border-box',
  margin: 0,
  padding: '0.5em',
  width: '100%',
};

export const inputErrorStyle = {
  ...inputStyle,
  border: `1px solid ${red}`,
};
