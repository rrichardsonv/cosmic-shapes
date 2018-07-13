import Land from './lib/components/Land';
import { prepareEcosystem } from './lib/components/utilities';
import DeviceManager from './lib/DeviceManager';

const app = new DeviceManager();

let animationId = null;

app.on('deviceready', function() {
  var can = document.getElementById('c');
  var c = can.getContext('2d');
  const center = {
    x: 240,
    y: 240,
  };
  const gooProps = {
    qty: 25,
    maxW: 25,
    minW: 10,
    maxL: 30,
    minL: 18,
    maxSpeed: 0,
    minSpeed: 0.5,
    sample: [{ x: 20, y: 10 }],
  };

  let gooBlobs = prepareEcosystem(Land, gooProps, 240, center);

  function animateBlobs() {
    for (let i = 0; i < gooBlobs.length; i++) {
      gooBlobs[i].update(c);
    }
    animationId = requestAnimationFrame(animateBlobs);
  }

  animationId = requestAnimationFrame(animateBlobs);
});

app.on('devicepause', function() {
  if (animationId !== null) {
    console.log('not null');
    cancelAnimationFrame(animationId);
  }
});

app.on('deviceplay', function() {
  // probably move the code from ready down here move some of the event binds up and emit an extra event
});

app.run();
