import { EventEmitter } from 'events';
import EventListeners from './EventListeners';

const listeners = new EventListeners();
class DeviceManager extends EventEmitter {
  onDeviceReady = e => {
    listeners.setDOMcontext();
    listeners.setRefreshBtnListener(this.onDevicePlay);
    listeners.setCanvasListener(this.onHideControls);
    this.emit('deviceready', e);
  };

  onDevicePause = e => {
    e.preventDefault();
    e.stopPropagation();

    listeners.removeRefreshBtnListener(this.onDevicePause);
    listeners.setRefreshBtnListener(this.onDevicePlay);
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.classList.remove('playing');

    this.emit('devicepause', e);
  };

  onDevicePlay = e => {
    e.preventDefault();
    e.stopPropagation();

    listeners.removeRefreshBtnListener(this.onDevicePlay);
    listeners.setRefreshBtnListener(this.onDevicePause);
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.classList.add('playing');

    const newColor = listeners.getColor();
    newColor ? this.emit('deviceplay', newColor) : this.emit('deviceplay');
  };

  onHideControls = e => {
    e.preventDefault();
    e.stopPropagation();
    const controls = document.getElementById('controls');
    controls.classList.add('fade-out');
    controls.classList.remove('fade-in');
    listeners.removeCanvasListener(this.onHideControls);
    listeners.setCanvasListener(this.onShowControls);

    this.emit('hidecontrols');
  };

  onShowControls = e => {
    e.preventDefault();
    e.stopPropagation();
    const controls = document.getElementById('controls');
    controls.classList.remove('fade-out');
    controls.classList.add('fade-in');
    listeners.removeCanvasListener(this.onShowControls);
    listeners.setCanvasListener(this.onHideControls);

    this.emit('showcontrols');
  };

  run = () => {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  };
}

export default DeviceManager;
