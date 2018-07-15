import io from 'socket.io-client';

class RecordingUploader {
  constructor(url) {
    this.fileReader = this.getFileReader();
    this.socket = this.getWebSocket(url);
    this.currentUpload = null;
    this.queue = [];
  }

  getFileReader = () => {
    const fileReader = new FileReader();
    fileReader.onload = this.onLoad;
    fileReader.onloadend = this.onLoadEnd;
    return fileReader;
  };

  getWebSocket = url => {
    const socket = io.connect(url);
    return socket;
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
