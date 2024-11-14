export const themes = {
  classic: {
    background: '#1a1a1a',
    snake: '#4CAF50',
    food: '#FF5252',
    border: '#333333',
    text: '#FFFFFF'
  },
  pixel: {
    background: '#2B2B2B',
    snake: {
      head: '#71C771',
      body: '#4CAF50',
      tail: '#388E3C'
    },
    food: '#FF5252',
    border: '#404040',
    text: '#FFFFFF',
    gridLines: true
  },
  neon: {
    background: '#000000',
    snake: {
      color: '#00ff00',
      glow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00'
    },
    food: {
      color: '#ff00ff',
      glow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff'
    },
    border: '#1a1a1a',
    text: '#00ff00',
    gridLines: {
      color: 'rgba(0, 255, 0, 0.1)',
      glow: '0 0 5px rgba(0, 255, 0, 0.2)'
    }
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