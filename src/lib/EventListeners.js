class EventListeners {
  constructor() {
    this.refreshBtn = null;
    this.colorInput = null;
    this.canvas = null;
  }

  setDOMcontext = () => {
    this.refreshBtn = document.getElementById('refresh-btn');
    this.colorInput = document.getElementById('color-input');
    this.canvas = document.getElementById('c');
  };

  setRefreshBtnListener = handler => {
    this.refreshBtn.addEventListener('click', handler, { once: true });
    this.refreshBtn.addEventListener('touchstart', handler, { once: true });
  };

  removeRefreshBtnListener = handler => {
    this.refreshBtn.removeEventListener('click', handler);
    this.refreshBtn.removeEventListener('touchstart', handler);
  };

  setCanvasListener = handler => {
    this.canvas.addEventListener('click', handler, { once: true });
    this.canvas.addEventListener('touchstart', handler, { once: true });
  };

  removeCanvasListener = handler => {
    this.canvas.removeEventListener('click', handler);
    this.canvas.removeEventListener('touchstart', handler);
  };

  getColor = () => {
    return this.colorInput.value;
  };
}

export default EventListeners;
