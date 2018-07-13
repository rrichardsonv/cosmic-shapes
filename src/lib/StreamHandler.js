class StreamHandler {
  constructor() {
    this.target = null;
    this.mediaRecorder = null;
    this.chunks = [];
    this.blob = null;
  }

  setCaptureStream = () => {
    const canvas = document.getElementById('c');
    const stream = canvas.captureStream();
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=h264' });
    // this.mediaRecorder.onStop = this.onStop;
    // this.mediaRecorder.onDataAvailable = this.onDataAvailable;
  };

  startRecord = () => {
    this.mediaRecorder.start();
  };

  stopRecord = () => {
    const blob = this.mediaRecorder.requestData();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:6001/videos', true);
    xhr.setRequestHeader('Content-Type', 'video/webm;codecs=h264');
    xhr.send(blob);
  };

  // onStop = e => {
  //   this.blob = new Blob(this.chunks, { type: 'video/webm;codecs=h264' });
  //   let xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://localhost:6001/videos');
  //   xhr.send(blob);
  // };

  // onDataAvailable = e => {
  //   this.chunks.push(e.data);
  // };
}

export default StreamHandler;
