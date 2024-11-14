import React from 'react';

function GameStats({ stats }) {
  return (
    <div className="game-stats">
      <h3>游戏统计</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span>游戏次数</span>
          <span>{stats.gamesPlayed}</span>
        </div>
        <div className="stat-item">
          <span>最长蛇身</span>
          <span>{stats.maxLength}</span>
        </div>
        <div className="stat-item">
          <span>总得分</span>
          <span>{stats.totalScore}</span>
        </div>
        <div className="stat-item">
          <span>平均得分</span>
          <span>{(stats.totalScore / stats.gamesPlayed || 0).toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default GameStats; 