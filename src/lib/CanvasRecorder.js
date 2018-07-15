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
  }

  setCaptureStream = () => {
    const canvas = document.getElementById('c');
    const stream = canvas.captureStream();
    this.mediaRecorder = this.getMediaRecorder(stream);
  };

  getMediaRecorder = stream => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: Recording.CODEC });
    mediaRecorder.onstop = this.onStop;
    mediaRecorder.ondataavailable = this.onDataAvailable;

    return mediaRecorder;
  };

  onStop = () => {
    console.log('data available after MediaRecorder.stop() called.');
    this.recording.setBlob(new Blob(this.chunks, { type: Recording.CODEC }));
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
    this.mediaRecorder.start();
  };

  stopRecord = onRecordingReady => {
    this.recordingEnd = getDateTime();
    this.recording = new Recording({
      startMs: this.startTime,
      endMs: this.recordingEnd,
      onRecordingReady,
    });
    this.mediaRecorder.stop();
  };
}

export default CanvasRecorder;
