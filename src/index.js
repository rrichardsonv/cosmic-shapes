import DeviceManager from './lib/DeviceManager';
import Animation from './lib/Animation';
import StreamHandler from './lib/StreamHandler';

const app = new DeviceManager();
const animation = new Animation();
const streamHandler = new StreamHandler();

app.on('deviceready', function() {
  animation.setCanvasContext();
  streamHandler.setCaptureStream();
});

app.on('devicepause', function() {
  animation.cancel();
  streamHandler.stopRecord();
});

app.on('deviceplay', function(newColor) {
  animation.run(newColor);
  streamHandler.startRecord();
});

app.run();
