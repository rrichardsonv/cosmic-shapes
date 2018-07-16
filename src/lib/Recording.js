import hash from 'string-hash';

const hashSimpleId = (...strings) => {
  const simpleSalt = Math.random().toString(32);
  return hash(strings.join(`${simpleSalt}`)).toString(32);
};

class Recording {
  constructor({ startMs, endMs, onRecordingReady, thumbnailBlob }) {
    this.start = startMs;
    this.end = endMs;
    this.duration = endMs - startMs;
    this.id = hashSimpleId(startMs, endMs);
    this.blob = null;
    this.blobSize = null;
    this.thumbnailBlob = thumbnailBlob;
    this.srcUrl = null;
    this.onReady = onRecordingReady;
  }

  static VIDEO_CODEC = 'video/webm;codecs=h264';
  static IMAGE_CODEC = 'image/png';

  setBlob = blob => {
    this.blob = blob;
    this.blobSize = blob.size;
    this.srcUrl = window.URL.createObjectURL(blob);
    this.ready();
  };

  ready = () => {
    this.onReady({
      video: this.blob,
      metaData: this.metaData(),
      thumbnail: this.thumbnailBlob,
    });
  };

  metaData = () => ({
    size: this.blobSize,
    name: this.id,
    duration: this.duration,
    start: this.startMs,
  });

  createInputElement = () => {
    const element = document.createElement('input');
    element.setAttribute('id', this.id);
    element.setAttribute('type', 'file');
    element.setAttribute('accept', Recording.VIDEO_CODEC);
    element.setAttribute('src', this.srcUrl);
    element.setAttribute('hidden', 'true');
    return element;
  };
}

export default Recording;
