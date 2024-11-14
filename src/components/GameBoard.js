import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import Tutorial from './Tutorial';
import SettingsPanel from './SettingsPanel';
import PauseOverlay from './PauseOverlay';
import AchievementNotification from './AchievementNotification';
import { achievementManager } from '../achievements/AchievementManager';
import { StorageManager } from '../utils/StorageManager';
import { themes } from '../themes/themes';

// 添加常量定义
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

function GameBoard() {
  const [showTutorial, setShowTutorial] = useState(() => !StorageManager.getTutorialCompleted());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const canvasRef = useRef(null);

  const {
    snake,
    food,
    score,
    gameOver,
    isPaused,
    direction,
    difficulty,
    currentTheme,
    theme,
    resetGame,
    setIsPaused,
    setDifficulty,
    setCurrentTheme,
    highScores
  } = useGameState();

  // 添加主题切换处理函数
  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    setIsPaused(false);
  };

  // 添加难度切换处理函数
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame(newDifficulty);
    setIsPaused(false);
  };

  // 添加设置处理函数
  const handleSettingsChange = (newSettings) => {
    setCurrentTheme(newSettings.theme);
    setDifficulty(newSettings.difficulty);
    StorageManager.saveSettings(newSettings);
  };

  // 检查成就
  useEffect(() => {
    const newAchievements = achievementManager.checkAchievements({
      score,
      difficulty,
      gamesPlayed: StorageManager.getGameStats().gamesPlayed
    });
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  }, [score, difficulty]);

  // 处理教程完成
  const handleTutorialComplete = () => {
    setShowTutorial(false);
    StorageManager.setTutorialCompleted(true);
  };

  // 处理成就通知关闭
  const handleAchievementDismiss = (achievementId) => {
    setAchievements(prev => prev.filter(a => a.id !== achievementId));
  };

  // 绘制游戏画面
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 绘制蛇
    ctx.fillStyle = theme.snake;
    snake.forEach(([x, y]) => {
      ctx.fillRect(
        x * GRID_SIZE,
        y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
      );
    });

    // 绘制食物
    ctx.fillStyle = theme.food;
    ctx.fillRect(
      food.x * GRID_SIZE,
      food.y * GRID_SIZE,
      GRID_SIZE - 1,
      GRID_SIZE - 1
    );
  }, [snake, food, theme, CANVAS_SIZE, GRID_SIZE]);

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-controls">
          <div className="control-group">
            <label>主题</label>
            <select 
              value={currentTheme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="classic">经典</option>
              <option value="pixel">像素</option>
              <option value="neon">霓虹</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>难度</label>
            <select 
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            >
              <option value="EASY">简单</option>
              <option value="NORMAL">普通</option>
              <option value="HARD">困难</option>
            </select>
          </div>
        </div>
      </div>

      <div className="game-info">
        <div className="score-section">
          <div className="score-display">
            <div className="score-label">当前得分</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="score-display">
            <div className="score-label">最高得分</div>
            <div className="score-value highlight">{highScores[difficulty]}</div>
          </div>
        </div>
        
        <div className="controls-help">
          <p>↑↓←→ 或 WASD：控制方向</p>
          <p>空格键：暂停/继续</p>
        </div>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{ 
            border: `2px solid ${theme.border}`,
            borderRadius: '4px'
          }}
        />
        
        {isPaused && !gameOver && (
          <div className="pause-overlay">
            <div className="pause-content">
              <div className="pause-icon">⏸️</div>
              <h2>游戏暂停</h2>
              <p>按空格键继续游戏</p>
            </div>
          </div>
        )}
        
        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <h2>游戏结束</h2>
              <p>得分: {score}</p>
              <p>最高分: {highScores[difficulty]}</p>
              <button onClick={() => resetGame()}>
                重新开始
              </button>
              <p className="hint">按空格键重新开始</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBoard;