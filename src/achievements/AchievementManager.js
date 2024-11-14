export const ACHIEVEMENTS = {
  FIRST_GAME: {
    id: 'FIRST_GAME',
    title: '初次尝试',
    description: '完成第一局游戏',
    icon: '🎮'
  },
  SCORE_100: {
    id: 'SCORE_100',
    title: '百分成就',
    description: '单局得分达到100分',
    icon: '💯'
  },
  SPEED_DEMON: {
    id: 'SPEED_DEMON',
    title: '极速达人',
    description: '在困难模式下获得50分',
    icon: '⚡'
  },
  PERSISTENT: {
    id: 'PERSISTENT',
    title: '坚持不懈',
    description: '累计游戏10次',
    icon: '🎯'
  }
};

class AchievementManager {
  constructor() {
    this.achievements = this.loadAchievements();
  }

  loadAchievements() {
    const saved = localStorage.getItem('snake_achievements');
    return saved ? JSON.parse(saved) : {};
  }

  saveAchievements() {
    localStorage.setItem('snake_achievements', JSON.stringify(this.achievements));
  }

  unlockAchievement(achievementId) {
    if (!this.achievements[achievementId]) {
      this.achievements[achievementId] = {
        unlocked: true,
        unlockedAt: new Date().toISOString()
      };
      this.saveAchievements();
      return ACHIEVEMENTS[achievementId];
    }
    return null;
  }

  checkAchievements(gameState) {
    const newAchievements = [];
    
    if (!this.achievements.FIRST_GAME) {
      newAchievements.push(this.unlockAchievement('FIRST_GAME'));
    }
    
    if (gameState.score >= 100 && !this.achievements.SCORE_100) {
      newAchievements.push(this.unlockAchievement('SCORE_100'));
    }
    
    if (gameState.difficulty === 'HARD' && 
        gameState.score >= 50 && 
        !this.achievements.SPEED_DEMON) {
      newAchievements.push(this.unlockAchievement('SPEED_DEMON'));
    }
    
    if (gameState.gamesPlayed >= 10 && !this.achievements.PERSISTENT) {
      newAchievements.push(this.unlockAchievement('PERSISTENT'));
    }
    
    return newAchievements;
  }
}

export const achievementManager = new AchievementManager(); 