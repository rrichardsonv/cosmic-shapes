import hash from 'string-hash';

const hashSimpleId = (...strings) => {
  const simpleSalt = Math.random().toString(32);
  return hash(strings.join(`${simpleSalt}`)).toString(32);
};

class Recording {
  constructor({ startMs, endMs, onRecordingReady }) {
    this.start = startMs;
    this.end = endMs;
    this.duration = endMs - startMs;
    this.id = hashSimpleId(startMs, endMs);
    this.blob = null;
    this.blobSize = null;
    this.srcUrl = null;
    this.onReady = onRecordingReady;
  }

  static CODEC = 'video/webm;codecs=h264';

  setBlob = blob => {
    this.blob = blob;
    this.blobSize = blob.size;
    this.srcUrl = window.URL.createObjectURL(blob);
    this.onReady(blob, this.metaData());
  };

  metaData = () => ({
    size: this.blobSize,
    name: this.id,
  });

  createInputElement = () => {
    const element = document.createElement('input');
    element.setAttribute('id', this.id);
    element.setAttribute('type', 'file');
    element.setAttribute('accept', Recording.CODEC);
    element.setAttribute('src', this.srcUrl);
    element.setAttribute('hidden', 'true');
    return element;
  };
}

export default Recording;
