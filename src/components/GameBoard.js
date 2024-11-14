import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import Tutorial from './Tutorial';
import SettingsPanel from './SettingsPanel';
import PauseOverlay from './PauseOverlay';
import AchievementNotification from './AchievementNotification';
import { achievementManager } from '../achievements/AchievementManager';
import { StorageManager } from '../utils/StorageManager';
import { themes } from '../themes/themes';
import TouchControls from './TouchControls';

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
    setDirection,
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

    // 根据主题绘制
    switch (currentTheme) {
      case 'neon':
        // 绘制网格
        ctx.strokeStyle = theme.gridLines.color;
        ctx.shadowColor = theme.gridLines.glow;
        ctx.shadowBlur = 5;
        ctx.lineWidth = 0.5;
        
        // 绘制蛇
        ctx.shadowColor = theme.snake.glow;
        ctx.shadowBlur = 15;
        ctx.fillStyle = theme.snake.color;
        snake.forEach(([x, y]) => {
          ctx.fillRect(
            x * GRID_SIZE,
            y * GRID_SIZE,
            GRID_SIZE - 1,
            GRID_SIZE - 1
          );
        });

        // 绘制食物
        ctx.shadowColor = theme.food.glow;
        ctx.fillStyle = theme.food.color;
        ctx.fillRect(
          food.x * GRID_SIZE,
          food.y * GRID_SIZE,
          GRID_SIZE - 1,
          GRID_SIZE - 1
        );
        break;

      case 'pixel':
        // 绘制网格
        if (theme.gridLines) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, CANVAS_SIZE);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(CANVAS_SIZE, i);
            ctx.stroke();
          }
        }

        // 绘制蛇
        snake.forEach(([x, y], index) => {
          ctx.fillStyle = index === 0 ? theme.snake.head : 
                         index === snake.length - 1 ? theme.snake.tail : 
                         theme.snake.body;
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
        break;

      default: // 经典主题
        ctx.fillStyle = theme.snake;
        snake.forEach(([x, y]) => {
          ctx.fillRect(
            x * GRID_SIZE,
            y * GRID_SIZE,
            GRID_SIZE - 1,
            GRID_SIZE - 1
          );
        });

        ctx.fillStyle = theme.food;
        ctx.fillRect(
          food.x * GRID_SIZE,
          food.y * GRID_SIZE,
          GRID_SIZE - 1,
          GRID_SIZE - 1
        );
    }
  }, [snake, food, theme, currentTheme, CANVAS_SIZE, GRID_SIZE]);

  // 在 useEffect 部分添加触摸事件处理
  useEffect(() => {
    const canvas = canvasRef.current;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastDirection = '';
    let lastDirectionTime = 0;

    const handleTouchStart = (e) => {
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!touchStartX || !touchStartY) return;

      const now = Date.now();
      if (now - lastDirectionTime < 100) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      const minSwipeDistance = 30;

      let newDirection = '';

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        newDirection = deltaX > 0 ? 'RIGHT' : 'LEFT';
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
        newDirection = deltaY > 0 ? 'DOWN' : 'UP';
      }

      if (newDirection && newDirection !== lastDirection) {
        setDirection(newDirection);
        lastDirection = newDirection;
        lastDirectionTime = now;
      }

      touchStartX = touchEndX;
      touchStartY = touchEndY;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [direction, setDirection]);

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

        <div className="score-section">
          <div className="score-display">
            <div className="score-label">当前得分</div>
            <div className="score-value current">{score}</div>
          </div>
          <div className="score-display controls-info">
            <div className="score-label">操作提示</div>
            <div className="controls-help">
              <p>↑↓←→ 或 WASD：控制方向</p>
              <p>空格键：暂停/继续</p>
            </div>
          </div>
          <div className="score-display">
            <div className="score-label">最高记录</div>
            <div className="score-value high">{highScores[difficulty]}</div>
          </div>
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
        
        {window.innerWidth <= 768 && (
          <TouchControls onDirectionChange={setDirection} />
        )}
      </div>
    </div>
  );
}

export default GameBoard;