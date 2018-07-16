import Recording from './Recording';

const getDateTime = () => {
  return new Date().getTime();
};
class CanvasRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.startTime = null;
    this.recording = null;
    this.chunks = [];
    this.canvas = null;
    this.thumbnail = null;
  }

  setCaptureStream = () => {
    this.canvas = document.getElementById('c');
    if (
      MediaRecorder &&
      this.canvas.captureStream &&
      typeof this.canvas.captureStream === 'function'
    ) {
      const stream = this.canvas.captureStream();
      this.mediaRecorder = this.getMediaRecorder(stream);
    }
  };

  getMediaRecorder = stream => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: Recording.VIDEO_CODEC });
    mediaRecorder.onstop = this.onStop;
    mediaRecorder.ondataavailable = this.onDataAvailable;

    return mediaRecorder;
  };

  onStop = () => {
    console.log('data available');
    this.recording.setBlob(new Blob(this.chunks, { type: Recording.VIDEO_CODEC }));
    // const inputElement = this.recording.createInputElement();
    // document.getElementById('controls').appendChild(inputElement);
    console.log('recorder stopped');
  };

  onDataAvailable = e => {
    this.chunks.push(e.data);
    console.log('onDataAvailable');
  };

  startRecord = () => {
    this.startTime = getDateTime();
    if (this.mediaRecorder !== null) {
      this.mediaRecorder.start();
    }
  };

  stopRecord = onRecordingReady => {
    this.recordingEnd = getDateTime();
    this.recording = new Recording({
      startMs: this.startTime,
      endMs: this.recordingEnd,
      onRecordingReady,
    });

    this.mediaRecorder && this.mediaRecorder.pause();

    this.canvas.toBlob(blob => {
      this.recording.thumbnailBlob = blob;

      if (this.mediaRecorder !== null) {
        this.mediaRecorder.stop();
      } else {
        this.recording.ready();
      }
    });
  };
}

export default CanvasRecorder;
