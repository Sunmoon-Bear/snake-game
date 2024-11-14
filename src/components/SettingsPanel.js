import React from 'react';
import ThemeSelector from './ThemeSelector';

function SettingsPanel({ 
  settings, 
  onSettingsChange,
  isOpen,
  onClose 
}) {
  if (!isOpen) return null;

  return (
    <div className="settings-panel">
      <div className="settings-content">
        <h3>游戏设置</h3>
        
        <div className="setting-item">
          <label>主题</label>
          <ThemeSelector 
            currentTheme={settings.theme}
            onThemeChange={(theme) => onSettingsChange({ ...settings, theme })}
          />
        </div>

        <div className="setting-item">
          <label>难度</label>
          <select 
            value={settings.difficulty}
            onChange={(e) => onSettingsChange({ ...settings, difficulty: e.target.value })}
          >
            <option value="EASY">简单</option>
            <option value="NORMAL">普通</option>
            <option value="HARD">困难</option>
          </select>
        </div>

        <div className="setting-item">
          <label>
            <input 
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onSettingsChange({ ...settings, soundEnabled: e.target.checked })}
            />
            启用音效
          </label>
        </div>

        <button className="close-button" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel; 