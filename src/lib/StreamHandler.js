class StreamHandler {
  constructor() {
    this.target = null;
  }

  setCaptureStream = () => {
    const canvas = document.getElementById('c');
    const stream = canvas.captureStream();
    const vid = document.getElementById('stream-target');
    vid.srcObject = stream;
  };
}

export default StreamHandler;
