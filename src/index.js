import AppManager from './lib/AppManager';
import Animation from './lib/Animation';
import CanvasRecorder from './lib/CanvasRecorder';
import RecordingUploader from './lib/RecordingUploader';

const GATEWAY_URL = 'http://localhost:6001/uploads';

const app = new AppManager();
const animation = new Animation();
const canvasRecorder = new CanvasRecorder();
const uploader = new RecordingUploader(GATEWAY_URL);

app.on('deviceready', function() {
  animation.setCanvasContext();
  canvasRecorder.setCaptureStream();
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
});

app.on('showcontrols', function() {
  const controls = document.getElementById('controls');
  controls.classList.remove('fade-out');
  controls.classList.add('fade-in');
});

app.run();
