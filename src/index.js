import Earth from './lib/components/Earth';
import DeviceManager from './lib/DeviceManager';

const app = new DeviceManager();

app.on('deviceready', function() {
  var canvas = document.querySelector('canvas');

  canvas.width = 980;
  canvas.height = 661;

  var c = canvas.getContext('2d');
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  console.log('center', center);
  const cloudProps = {
    qty: 25,
    maxW: 20,
    minW: 5,
    maxL: 30,
    minL: 18,
    maxSpeed: 1,
    minSpeed: 0.2,
    sample: [{ x: 20, y: 10 }],
  };
  const landProps = {
    qty: 25,
    maxW: 25,
    minW: 10,
    maxL: 30,
    minL: 18,
    maxSpeed: 0,
    minSpeed: 0.5,
    sample: [{ x: 20, y: 10 }],
  };
  const earthSize = 120;
  let earth = null;

  function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(11, 21, 56,0.3)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    earth = new Earth({ cloudProps, landProps, width: earthSize, center });
    earth.draw(c);

    earth.lands.forEach(land => {
      land.update(c);
    });

    earth.clouds.forEach(cloud => {
      cloud.update(c);
    });
  }

  animate();
});

app.run();
