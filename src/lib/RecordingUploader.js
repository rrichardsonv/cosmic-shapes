import io from 'socket.io-client';

const fakeError = str => ({
  message: str,
  stack: '',
});

const VIDEO = 'video';
const IMAGE = 'image';

const socketManager = io(`${process.env.LOCAL_URI}/uploads`, {
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
    this.duration = null;
    this.uploadType = null;
    this.afterLoadEnd = null;
    this.noMeta = false;
  }

  getFileReader = () => {
    const fileReader = new FileReader();
    fileReader.onload = this.onLoad;
    fileReader.onloadend = this.onLoadEnd;
    return fileReader;
  };

  getMetaData = () => ({
    name: this.currentUpload,
    fileType: this.uploadType,
    duration: this.duration,
    noMeta: this.noMeta,
  });

  connectToServer = (successFn, failFn) => {
    this.socket = socketManager.open();

    this.socket.on('connect_error', failFn);
    this.socket.on('connect_timeout', () => failFn(fakeError('Connection Timeout')));
    this.socket.on('reconnecting', attempt =>
      failFn(fakeError(`Reconnecting. Attempt: ${attempt}`))
    );

    this.socket.on('reconnect', successFn);
    this.socket.on('connect', successFn);
  };

  onLoad = e => {
    this.socket.emit(
      'upload',
      Object.assign({}, this.getMetaData(), { data: event.target.result })
    );
  };

  onLoadEnd = e => {
    this.socket.emit('uploadend', this.getMetaData());

    return this.continueQueue();
  };

  upload = ({ video, metaData, thumbnail }) => {
    if (this.currentUpload !== null) {
      this.queue.push({ video, metaData, thumbnail });
      return;
    }

    if (!video && !thumbnail) {
      return null;
    }

    this.currentUpload = metaData.name;
    this.duration = metaData.duration;
    this.noMeta = !!metaData.noMeta;

    if (video && thumbnail) {
      const newMetaData = Object.assign({}, metaData, { noMeta: true });
      this.queue.push({ video: null, thumbnail, metaData: newMetaData });
    }

    if (video) {
      this.uploadType = VIDEO;
      this.fileReader.readAsArrayBuffer(video);
    } else if (thumbnail) {
      this.uploadType = IMAGE;
      this.fileReader.readAsArrayBuffer(thumbnail);
    }
    const requestMeta = this.getMetaData();
    console.log(requestMeta);
    this.socket.emit('uploadstart', requestMeta);
  };

  hasQueuedUploads = () => this.queue.length > 0;

  continueQueue = () => {
    this.currentUpload = null;
    const nextUpload = this.queue.shift();

    if (nextUpload) {
      this.upload(nextUpload);
    }
  };
}

export default RecordingUploader;
