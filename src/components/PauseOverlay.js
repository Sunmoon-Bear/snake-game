import React from 'react';

function PauseOverlay({ isPaused, onResume }) {
  if (!isPaused) return null;

  return (
    <div className="pause-overlay">
      <div className="pause-content">
        <h2>游戏暂停</h2>
        <p>按空格键或点击继续游戏</p>
        <button onClick={onResume}>继续游戏</button>
      </div>
    </div>
  );
}

export default PauseOverlay; 