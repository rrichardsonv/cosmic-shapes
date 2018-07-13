import Circle from './lib/components/Circle';
import Land from './lib/components/Land';
import Cloud from './lib/components/Cloud';
import SemiCircle from './lib/components/SemiCircle';
import { earthMask } from './lib/components/utilities';
import DeviceManager from './lib/DeviceManager';

const app = new DeviceManager();
const DEFAULT_WIDTH = 120;
const SHADOW_COLOR = 'rgba(0, 0, 0, 0.4)';

function random(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function prepareEcosystem(Component, props, size, center) {
  const { qty, sample, maxW, minW, maxL, minL, minSpeed, maxSpeed } = props;
  let iterations = -1;
  let result = [];

  while (++iterations <= qty) {
    const bestCoords = earthMask(sample, size, center);
    result.push(
      new Component({
        x: bestCoords[0],
        y: bestCoords[1],
        dx: random(minSpeed, maxSpeed),
        width: random(minW, maxW),
        length: random(minL, maxL),
        center,
        size,
      })
    );
  }
  return result;
}
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
  const WATER_COLOR = 'rgb(25, 118, 181)';
  const earthSize = 120;
  let earth = null;
  let shadow = null;

  let lands = prepareEcosystem(Land, landProps, earthSize, center);
  let clouds = prepareEcosystem(Cloud, cloudProps, earthSize, center);

  function animate() {
    requestAnimationFrame(animate);

    earth = new Circle({ x: center.x, y: center.y, width: earthSize, fillColor: WATER_COLOR });
    earth.draw(c);

    for (let i = 0; i < lands.length; i++) {
      lands = lands[i].update(c);
    }

    for (let i = 0; i < lands.length; i++) {
      clouds = clouds[i].update(c);
    }

    shadow = new SemiCircle({
      x: center.x,
      y: center.y,
      width: earthSize,
      fillColor: SHADOW_COLOR,
    });
    shadow.draw(c);
  }
  c.fillStyle = 'rgba(11, 21, 56,0.3)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  animate();
});

app.run();
