export class KeyboardManager {
  static KEYS = {
    SPACE: 'Space',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    W: 'KeyW',
    S: 'KeyS',
    A: 'KeyA',
    D: 'KeyD',
    P: 'KeyP',
    R: 'KeyR',
    ESC: 'Escape'
  };

  constructor(handlers) {
    this.handlers = handlers;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    const handler = this.handlers[event.code];
    if (handler) {
      event.preventDefault();
      handler(event);
    }
  }

  attach() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  detach() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
} 