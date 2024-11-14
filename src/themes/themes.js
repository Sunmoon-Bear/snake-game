export const themes = {
  classic: {
    snake: '#00ff00',
    food: '#ff0000',
    background: '#000000',
    grid: '#333333',
    text: '#ffffff',
    border: '#666666'
  },
  pixel: {
    snake: '#39ff14',
    food: '#ff4444',
    background: '#202020',
    grid: '#404040',
    text: '#ffffff',
    border: '#808080'
  },
  neon: {
    snake: '#00ffff',
    food: '#ff00ff',
    background: '#000000',
    grid: '#1a1a1a',
    text: '#ffffff',
    border: '#00ffff'
  }
};

export const DEFAULT_THEME = {
    snake: '#00ff00',
    food: '#ff0000',
    background: '#000000',
    grid: '#333333',
    text: '#ffffff',
    border: '#666666'
};

export const getTheme = (themeName) => {
    return themes[themeName] || DEFAULT_THEME;
}; 