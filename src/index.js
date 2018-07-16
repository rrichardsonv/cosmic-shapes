import AppManager from './lib/AppManager';
import Animation from './lib/Animation';
import CanvasRecorder from './lib/CanvasRecorder';
import RecordingUploader from './lib/RecordingUploader';

const GATEWAY_URL = process.env.LOCAL_URI;

const app = new AppManager();
const animation = new Animation();
const canvasRecorder = new CanvasRecorder();
const uploader = new RecordingUploader();

const sanityTest = () => {
  if (process.env.DEBUG === 'true') {
    const request = new XMLHttpRequest();
    request.open('GET', `${GATEWAY_URL}/sanity`, true);
    request.send(null);
  }
};

const getFailedConnectionMsg = err => {
  if (process.env.DEBUG === 'true') {
    return `
    ${err.message}
    ${GATEWAY_URL}
      ---
    ${err.stack}
    `;
  } else {
    return 'Connection failed. Retrying';
  }
};

app.on('deviceready', function({ success, failure }) {
  sanityTest();
  uploader.connectToServer(success, failure);
});

app.on('connectionready', function() {
  // Hide the loader
  const loader = document.getElementById('loader');
  loader.classList.add('fade-out');
  loader.classList.add('hidden');

  // Setup the canvas and recorder
  animation.setCanvasContext();
  canvasRecorder.setCaptureStream();

  // Reveal the view
  const view = document.getElementById('main-view');
  view.classList.remove('hidden');
  view.classList.add('fade-in');
});

app.on('connectionfailed', function(err) {
  const msg = document.getElementById('loader-msg');
  msg.innerText = getFailedConnectionMsg(err);
});

app.on('devicepause', function() {
  const refreshBtn = document.getElementById('refresh-btn');
  refreshBtn.classList.remove('playing');
});

app.on('deviceplay', function() {
  const refreshBtn = document.getElementById('refresh-btn');
  refreshBtn.classList.add('playing');
});

app.on('animationstart', function(newColor) {
  animation.run(newColor);
});

app.on('animationend', function() {
  animation.cancel();
});

app.on('recordingstart', function() {
  canvasRecorder.startRecord();
});

app.on('recordingend', function() {
  canvasRecorder.stopRecord(uploader.upload);
});

app.on('hidecontrols', function() {
  const controls = document.getElementById('controls');
  controls.classList.add('fade-out');
  controls.classList.remove('fade-in');
  const flog = document.getElementById('fucking-log');
  flog.classList.remove('fade-out');
  flog.classList.add('fade-in');
});

app.on('showcontrols', function() {
  const controls = document.getElementById('controls');
  controls.classList.remove('fade-out');
  controls.classList.add('fade-in');
  const flog = document.getElementById('fucking-log');
  flog.classList.add('fade-out');
  flog.classList.remove('fade-in');
});

app.run();
