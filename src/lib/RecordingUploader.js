import io from 'socket.io-client';

const fakeError = str => ({
  message: str,
  stack: '',
});

const socketManager = io(`http://${process.env.LOCAL_URI}:6001/uploads`, {
  autoConnect: false,
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  rejectUnauthorized: false,
});

class RecordingUploader {
  constructor() {
    this.fileReader = this.getFileReader();
    this.socket = null;
    this.currentUpload = null;
    this.queue = [];
  }

  getFileReader = () => {
    const fileReader = new FileReader();
    fileReader.onload = this.onLoad;
    fileReader.onloadend = this.onLoadEnd;
    return fileReader;
  };

  connectToServer = (successFn, failFn) => {
    this.socket = socketManager.open();
    this.socket.on('connect_error', failFn);
    this.socket.on('connect_timeout', () => failFn(fakeError('timeout')));
    this.socket.on('reconnecting', attempt =>
      failFn(fakeError(`Reconnecting attempt: ${attempt}`))
    );
    this.socket.on('reconnect', successFn);
    this.socket.on('connect', successFn);
  };

  onLoad = e => {
    this.socket.emit('upload', { name: this.currentUpload, data: event.target.result });
  };

  onLoadEnd = e => {
    this.socket.emit('uploadend', { name: this.currentUpload });
    this.currentUpload = null;
  };

  upload = (blob, metaData) => {
    if (this.currentUpload === null) {
      this.currentUpload = metaData.name;
      this.fileReader.readAsArrayBuffer(blob);
      this.socket.emit('uploadstart', metaData);
    } else {
      this.queue.push([blob, metaData]);
    }
  };

  hasQueuedUploads = () => this.queue.length > 0;

  continueQueue = () => {
    if (this.hasQueuedUploads()) {
      this.upload(...this.queue.shift());
    }
  };
}

export default RecordingUploader;
