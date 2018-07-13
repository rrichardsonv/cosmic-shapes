import { EventEmitter } from 'events';

class DeviceManager extends EventEmitter {
  onDeviceReady = e => {
    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.addEventListener('click', this.onDevicePause);
    this.emit('deviceready', e);
  };

  onDevicePause = e => {
    this.emit('devicepause', e);
  };

  run = () => {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  };
}

export default DeviceManager;
