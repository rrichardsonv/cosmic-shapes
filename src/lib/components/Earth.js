import Circle from './Circle';
import SemiCircle from './SemiCircle';
import Land from './Land';
import Cloud from './Cloud';
import { earthMask } from './utilities';

/*
both cloud and land props have the following shape with all keys as int:
{ qty, data, maxW, minW, maxL, minL, minSpeed, maxSpeed }

*/
const WATER_COLOR = 'rgb(25, 118, 181)';
const SHADOW_COLOR = 'rgba(0, 0, 0, 0.4)';
const DEFAULT_WIDTH = 120;

class Earth {
  constructor({ width, landProps, cloudProps, center }) {
    this.center = center;
    this.lands = this.prepareEcosystem(Land, landProps, width, center);
    this.clouds = this.prepareEcosystem(Cloud, cloudProps, width, center);
    this.sphere = new Circle(center.x, center.y, width || DEFAULT_WIDTH, WATER_COLOR);
    this.shadow = new SemiCircle(center.x, center.y, width || DEFAULT_WIDTH, SHADOW_COLOR);
  }

  static random(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  prepareEcosystem = (Component, props, size, center) => {
    const { qty, sample, maxW, minW, maxL, minL, minSpeed, maxSpeed } = props;
    let iterations = -1;
    let result = [];

    while (++iterations <= qty) {
      const bestCoords = earthMask(sample, size, center);
      result.push(
        new Component({
          x: bestCoords[0],
          y: bestCoords[1],
          dx: Earth.random(minSpeed, maxSpeed),
          width: Earth.random(minW, maxW),
          length: Earth.random(minL, maxL),
          center,
          size,
        })
      );
    }
    return result;
  };

  draw = canvas => {
    this.lands.forEach(land => land.draw(canvas));
    this.clouds.forEach(cloud => cloud.draw(canvas));
    this.shadow.draw(canvas);
    this.sphere.draw(canvas);
  };
}

export default Earth;
