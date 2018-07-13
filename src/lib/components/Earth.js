import Circle from './Circle';
import { earthMask } from './utilities';

/*
both cloud and land props have the following shape with all keys as int:
{ qty, data, maxW, minW, maxL, minL, minSpeed, maxSpeed }

*/

class Earth {
  constructor({ width, landProps, cloudProps, center }) {
    this.center = center;
    this.sphere = new Circle(center.x, center.y, width || DEFAULT_WIDTH, WATER_COLOR);
  }

  draw = canvas => {
    this.sphere.draw(canvas);
  };
}

export default Earth;
