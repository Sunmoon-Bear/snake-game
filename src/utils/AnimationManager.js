class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.requestId = null;
  }

  addAnimation(key, animation) {
    this.animations.set(key, {
      start: performance.now(),
      ...animation
    });
    
    if (!this.requestId) {
      this.animate();
    }
  }

  removeAnimation(key) {
    this.animations.delete(key);
    
    if (this.animations.size === 0) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  animate(timestamp) {
    for (const [key, animation] of this.animations.entries()) {
      const elapsed = timestamp - animation.start;
      
      if (elapsed >= animation.duration) {
        animation.onComplete?.();
        this.removeAnimation(key);
      } else {
        const progress = elapsed / animation.duration;
        animation.onUpdate?.(progress);
      }
    }

    if (this.animations.size > 0) {
      this.requestId = requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export const animationManager = new AnimationManager(); 