export class GameStateManager {
  static SAVE_KEY = 'snake_game_save';

  static saveGameState(gameState) {
    const saveData = {
      snake: gameState.snake,
      food: gameState.food,
      score: gameState.score,
      difficulty: gameState.difficulty,
      timestamp: Date.now()
    };

    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
  }

  static loadGameState() {
    const savedData = localStorage.getItem(this.SAVE_KEY);
    if (!savedData) return null;

    try {
      const gameState = JSON.parse(savedData);
      const saveAge = Date.now() - gameState.timestamp;
      
      // 如果存档超过24小时，则不加载
      if (saveAge > 24 * 60 * 60 * 1000) {
        this.clearGameState();
        return null;
      }

      return gameState;
    } catch (error) {
      console.error('Failed to load game state:', error);
      return null;
    }
  }

  static clearGameState() {
    localStorage.removeItem(this.SAVE_KEY);
  }
} 