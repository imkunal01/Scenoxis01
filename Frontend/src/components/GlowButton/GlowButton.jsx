import React from 'react';
import './GlowButton.css';

const GlowButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'glow-button';
  const variantClass = `glow-button--${variant}`;
  const sizeClass = `glow-button--${size}`;
  const disabledClass = disabled ? 'glow-button--disabled' : '';
  
  const classes = [baseClasses, variantClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="glow-button__content">
        {children}
      </span>
      <span className="glow-button__glow"></span>
      <span className="glow-button__ripple"></span>
    </button>
  );
};

export default GlowButton;
