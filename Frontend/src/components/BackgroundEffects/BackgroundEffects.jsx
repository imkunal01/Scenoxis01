import React from 'react';
import './BackgroundEffects.css';

const BackgroundEffects = ({ type = 'aurora', intensity = 'low' }) => {
  const renderEffect = () => {
    switch (type) {
      case 'aurora':
        return (
          <div className="background-aurora">
            <div className="aurora-layer aurora-layer-1"></div>
            <div className="aurora-layer aurora-layer-2"></div>
            <div className="aurora-layer aurora-layer-3"></div>
          </div>
        );
      case 'grid':
        return (
          <div className="background-grid">
            <div className="grid-pattern"></div>
            <div className="grid-overlay"></div>
          </div>
        );
      case 'particles':
        return (
          <div className="background-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`background-effects background-effects--${intensity}`}>
      {renderEffect()}
    </div>
  );
};

export default BackgroundEffects;
