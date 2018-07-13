import DeviceManager from './lib/DeviceManager';
import Animation from './lib/Animation';
import StreamHandler from './lib/StreamHandler';

const app = new DeviceManager();
const animation = new Animation();
const streamHandler = new StreamHandler();

app.on('deviceready', function() {
  animation.setCanvasContext();
});

app.on('devicepause', function() {
  animation.cancel();
});

app.on('deviceplay', function(newColor) {
  animation.run(newColor);
  streamHandler.setCaptureStream();
});

app.run();
