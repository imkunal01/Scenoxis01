import React from 'react';
import './GradualBlur.css';

const GradualBlur = ({
  target = 'parent',
  position = 'bottom',
  height = '6rem',
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = true,
  opacity = 1
}) => {
  const generateBlurDivs = () => {
    const divs = [];
    const step = 1 / divCount;
    
    for (let i = 0; i < divCount; i++) {
      const progress = i * step;
      let blurValue;
      
      if (exponential) {
        blurValue = Math.pow(progress, 2) * strength;
      } else {
        blurValue = progress * strength;
      }
      
      const style = {
        position: 'absolute',
        width: '100%',
        height: `${100 / divCount}%`,
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`,
        opacity: opacity * (1 - progress * 0.3),
        zIndex: 1,
        ...(position === 'top' ? { top: `${i * (100 / divCount)}%` } : { bottom: `${i * (100 / divCount)}%` })
      };
      
      divs.push(
        <div
          key={i}
          className="gradual-blur-inner"
          style={style}
        >
          <div style={{ width: '100%', height: '100%' }} />
        </div>
      );
    }
    
    return divs;
  };

  const containerStyle = {
    position: target === 'fixed' ? 'fixed' : 'absolute',
    top: position === 'top' ? 0 : 'auto',
    bottom: position === 'bottom' ? 0 : 'auto',
    left: 0,
    right: 0,
    height: height,
    width: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1000
  };

  return (
    <div className="gradual-blur" style={containerStyle}>
      {generateBlurDivs()}
    </div>
  );
};

export default GradualBlur;
