import { EventEmitter } from 'events';
import DOMListeners from './DOMListeners';

const listeners = new DOMListeners();

const debugLog = (...args) => {
  if (process.env.DEBUG === 'true') {
    console && console.log(...args);
  }
};

class AppManager extends EventEmitter {
  onDeviceReady = e => {
    listeners.setDOMcontext();
    listeners.setRefreshBtnListener(this.onDevicePlay);
    listeners.setCanvasListener(this.onHideControls);
    this.emit('deviceready');
    debugLog('deviceready');
  };

  onDevicePause = e => {
    e.preventDefault();
    e.stopPropagation();

    listeners.removeRefreshBtnListener(this.onDevicePause);
    listeners.setRefreshBtnListener(this.onDevicePlay);

    this.emit('devicepause');
    debugLog('devicepause');

    this.onAnimationEnd(e);
  };

  onDevicePlay = e => {
    e.preventDefault();
    e.stopPropagation();

    listeners.removeRefreshBtnListener(this.onDevicePlay);
    listeners.setRefreshBtnListener(this.onDevicePause);

    this.emit('deviceplay');
    debugLog('deviceplay');

    this.onAnimationStart(e);
  };

  onAnimationStart = e => {
    const newColor = listeners.getColor();
    newColor ? this.emit('animationstart', newColor) : this.emit('animationstart');
    debugLog('animationstart');

    this.onRecordingStart();
  };

  onAnimationEnd = e => {
    this.emit('animationend');
    debugLog('animationend');

    this.onRecordingEnd();
  };

  onRecordingStart = e => {
    this.emit('recordingstart');
    debugLog('recordingstart');
  };

  onRecordingEnd = e => {
    this.emit('recordingend');
    debugLog('recordingend');
  };

  onUploadStart = e => {
    this.emit('uploadstart');
    debugLog('uploadstart');
  };

  onHideControls = e => {
    e.preventDefault();
    e.stopPropagation();

    listeners.removeCanvasListener(this.onHideControls);
    listeners.setCanvasListener(this.onShowControls);

    this.emit('hidecontrols');
    debugLog('hidecontrols');
  };

  onShowControls = e => {
    e.preventDefault();
    e.stopPropagation();

    listeners.removeCanvasListener(this.onShowControls);
    listeners.setCanvasListener(this.onHideControls);

    this.emit('showcontrols');
    debugLog('showcontrols');
  };

  run = () => {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  };
}

export default AppManager;
