class AudioManager {
  constructor() {
    this.sounds = {
      eat: new Audio('/sounds/eat.mp3'),
      gameOver: new Audio('/sounds/gameover.mp3'),
      move: new Audio('/sounds/move.mp3')
    };
    
    // 预加载所有音效
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  play(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('音频播放失败:', e));
    }
  }
}

export const audioManager = new AudioManager(); 