const STORAGE_KEYS = {
  HIGH_SCORES: 'snake_high_scores',
  STATS: 'snake_stats',
  SETTINGS: 'snake_settings'
};

export class StorageManager {
  static saveHighScores(scores) {
    localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(scores));
  }

  static getHighScores() {
    const scores = localStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
    return scores ? JSON.parse(scores) : { EASY: 0, NORMAL: 0, HARD: 0 };
  }

  static saveGameStats(stats) {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }

  static getGameStats() {
    const stats = localStorage.getItem(STORAGE_KEYS.STATS);
    return stats ? JSON.parse(stats) : {
      gamesPlayed: 0,
      maxLength: 0,
      totalScore: 0
    };
  }

  static saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  static getSettings() {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      theme: 'classic',
      difficulty: 'NORMAL',
      soundEnabled: true
    };
  }

  static getTutorialCompleted() {
    return localStorage.getItem('tutorial_completed') === 'true';
  }

  static setTutorialCompleted(completed) {
    localStorage.setItem('tutorial_completed', completed);
  }
} 