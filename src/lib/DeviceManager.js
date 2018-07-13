import { EventEmitter } from 'events';

class DeviceManager extends EventEmitter {
  onDeviceReady = e => {
    this.emit('deviceready', e);
  };

  run = () => {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  };
}

export default DeviceManager;
