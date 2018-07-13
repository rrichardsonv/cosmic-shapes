import DeviceManager from './lib/DeviceManager';
import Animation from './lib/Animation';

const app = new DeviceManager();
const animation = new Animation();

app.on('deviceready', function() {
  animation.setCanvasContext();
});

app.on('devicepause', function() {
  animation.cancel();
});

app.on('deviceplay', function(newColor) {
  animation.run(newColor);
});

app.run();
