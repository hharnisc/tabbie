import {
  red,
} from './colors';

export const inputStyle = {
  border: '1px solid #808080',
  boxSizing: 'border-box',
  margin: 0,
  fontSize: '1em',
  padding: '0.75em',
};

export const inputErrorStyle = {
  ...inputStyle,
  border: `1px solid ${red}`,
};
