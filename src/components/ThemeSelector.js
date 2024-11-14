import React from 'react';
import { themes } from '../themes/themes';

function ThemeSelector({ currentTheme, onThemeChange }) {
  return (
    <div className="theme-selector">
      <select 
        value={currentTheme} 
        onChange={(e) => onThemeChange(e.target.value)}
      >
        <option value="classic">经典主题</option>
        <option value="pixel">像素风格</option>
        <option value="neon">霓虹风格</option>
        <option value="minimal">简约风格</option>
        <option value="seasonal">季节主题</option>
      </select>
    </div>
  );
}

export default ThemeSelector; 