import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  video: {
    name: 'Video Editing',
    accent: '#00d4ff',
    accentGlow: 'rgba(0, 212, 255, 0.3)',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    cardBg: 'rgba(0, 212, 255, 0.05)',
    border: 'rgba(0, 212, 255, 0.2)',
    text: '#ffffff',
    icon: '🎥'
  },
  web: {
    name: 'Web Development',
    accent: '#00ff88',
    accentGlow: 'rgba(0, 255, 136, 0.3)',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #0d2e0d 50%, #1a3d1a 100%)',
    cardBg: 'rgba(0, 255, 136, 0.05)',
    border: 'rgba(0, 255, 136, 0.2)',
    text: '#ffffff',
    icon: '💻'
  },
  design: {
    name: 'Graphic Design',
    accent: '#ff4757',
    accentGlow: 'rgba(255, 71, 87, 0.3)',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #2e0a0a 50%, #3e1616 100%)',
    cardBg: 'rgba(255, 71, 87, 0.05)',
    border: 'rgba(255, 71, 87, 0.2)',
    text: '#ffffff',
    icon: '🎨'
  },
  default: {
    name: 'Scenoxis',
    accent: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.3)',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d1b69 100%)',
    cardBg: 'rgba(139, 92, 246, 0.05)',
    border: 'rgba(139, 92, 246, 0.2)',
    text: '#ffffff',
    icon: '✨'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeTheme = (themeKey) => {
    if (themeKey === currentTheme) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTheme(themeKey);
      setIsTransitioning(false);
    }, 300);
  };

  const theme = themes[currentTheme];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-glow', theme.accentGlow);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--text', theme.text);
  }, [theme]);

  const value = {
    currentTheme,
    theme,
    changeTheme,
    isTransitioning,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
