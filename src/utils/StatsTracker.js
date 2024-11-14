export class StatsTracker {
  constructor() {
    this.stats = this.loadStats();
  }

  loadStats() {
    const saved = localStorage.getItem('snake_stats');
    return saved ? JSON.parse(saved) : {
      gamesPlayed: 0,
      totalScore: 0,
      highestScore: 0,
      longestSnake: 0,
      totalPlayTime: 0,
      averageScore: 0
    };
  }

  saveStats() {
    localStorage.setItem('snake_stats', JSON.stringify(this.stats));
  }

  updateStats(gameData) {
    this.stats.gamesPlayed++;
    this.stats.totalScore += gameData.score;
    this.stats.highestScore = Math.max(this.stats.highestScore, gameData.score);
    this.stats.longestSnake = Math.max(this.stats.longestSnake, gameData.snakeLength);
    this.stats.totalPlayTime += gameData.playTime;
    this.stats.averageScore = this.stats.totalScore / this.stats.gamesPlayed;
    
    this.saveStats();
  }

  getStats() {
    return { ...this.stats };
  }
}

export const statsTracker = new StatsTracker(); 