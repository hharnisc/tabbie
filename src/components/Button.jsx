import React, { PropTypes } from 'react';
import { connectHoverable } from '@bufferapp/redux-hover';
import {
  primaryButtonStyle,
  buttonStyle,
  warningButtonStyle,
  hoveredButton,
  hoveredWarningButtonStyle,
  fullWidth as fullWidthStyle,
} from '../styles/button';

const calcColor = ({ type, hovered }) => {
  if (type === 'primary') {
    return primaryButtonStyle;
  } else if (type === 'secondary' && hovered) {
    return hoveredButton;
  } else if (type === 'secondary') {
    return buttonStyle;
  } else if (type === 'warning' && hovered) {
    return hoveredWarningButtonStyle;
  }
  return warningButtonStyle;
};

const calcStyle = ({ type, hovered, fullWidth }) => {
  const colorStyle = calcColor({ type, hovered });
  const dimensionStyle = fullWidth ? fullWidthStyle : {};
  return { ...colorStyle, ...dimensionStyle };
};

const Button = ({
  children,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  type,
  fullWidth,
}) =>
  <button
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={calcStyle({ type, hovered, fullWidth })}
  >
    {children}
  </button>;

Button.propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  hovered: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['secondary', 'warning', 'primary']),
};

Button.defaultProps = {
  type: 'secondary',
};

export default connectHoverable(Button);
