class AdvancedAudioManager {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.sounds = new Map();
    this.volumes = {
      master: 1,
      sfx: 0.7,
      music: 0.5
    };
    this.buffers = {};
    this.musicNode = null;
  }

  async loadSound(name, url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.buffers[name] = audioBuffer;
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  playSound(name, options = {}) {
    const buffer = this.buffers[name];
    if (!buffer) return;

    const source = this.context.createBufferSource();
    const gainNode = this.context.createGain();
    
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(this.context.destination);

    const volume = this.volumes.master * (options.volume || 1) * this.volumes.sfx;
    gainNode.gain.value = volume;

    if (options.loop) {
      source.loop = true;
    }

    source.start(0);
    
    return {
      stop: () => source.stop(),
      setVolume: (value) => {
        gainNode.gain.value = value * this.volumes.master * this.volumes.sfx;
      }
    };
  }

  playMusic(name, fadeInDuration = 2) {
    if (this.musicNode) {
      this.stopMusic(1);
    }

    const source = this.context.createBufferSource();
    const gainNode = this.context.createGain();
    
    source.buffer = this.buffers[name];
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(this.context.destination);

    gainNode.gain.value = 0;
    source.start(0);

    gainNode.gain.linearRampToValueAtTime(
      this.volumes.master * this.volumes.music,
      this.context.currentTime + fadeInDuration
    );

    this.musicNode = { source, gainNode };
  }

  stopMusic(fadeOutDuration = 1) {
    if (!this.musicNode) return;

    const { gainNode, source } = this.musicNode;
    gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + fadeOutDuration);
    setTimeout(() => source.stop(), fadeOutDuration * 1000);
    this.musicNode = null;
  }

  setVolume(type, value) {
    this.volumes[type] = Math.max(0, Math.min(1, value));
    
    if (type === 'master' || type === 'music') {
      if (this.musicNode) {
        this.musicNode.gainNode.gain.value = this.volumes.master * this.volumes.music;
      }
    }
  }
}

export const audioManager = new AdvancedAudioManager(); 