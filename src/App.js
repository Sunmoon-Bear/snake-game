import React from 'react';
import './App.css';
import './styles/mobile.css';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="App">
      <h1>贪吃蛇游戏</h1>
      <div className="game-board">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;