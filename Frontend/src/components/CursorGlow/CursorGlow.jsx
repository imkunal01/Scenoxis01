import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './CursorGlow.css';

const CursorGlow = () => {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--cursor-glow-color', theme.accentGlow);
  }, [theme]);

  if (!isVisible) return null;

  return (
    <div
      className="cursor-glow"
      style={{
        left: position.x - 10,
        top: position.y - 10,
        '--glow-color': theme.accentGlow,
      }}
    />
  );
};

export default CursorGlow;
