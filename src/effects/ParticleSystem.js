class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4
    };
    this.alpha = 1;
    this.life = 1;
    this.decay = 0.02;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= this.decay;
    this.alpha = this.life;
    
    return this.life > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.restore();
  }
}

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
  }

  emit(x, y, color, count = 20) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  update() {
    this.particles = this.particles.filter(particle => particle.update());
  }

  draw() {
    this.particles.forEach(particle => particle.draw(this.ctx));
  }
} 