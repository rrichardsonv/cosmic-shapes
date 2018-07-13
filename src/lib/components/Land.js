import { TAU } from './constants';

const LAND_COLOR = '#85cc66';

class Land {
  constructor({ x, y, dx, width, length, center, size }) {
    this.properties = { x, y, dx, width, length };
    this.center = center;
    this.earthRadius = size;
    this.earthDiameter = size * 2;
  }

  draw = ctx => {
    const { x, y, length, width } = this.properties;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.earthRadius, 0, TAU, false);
    ctx.clip();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineWidth = width;
    ctx.lineTo(x + length, y);
    ctx.strokeStyle = LAND_COLOR;
    ctx.stroke();
    ctx.restore();
  };

  update = ctx => {
    const { x, dx } = this.properties;
    let newX = x;

    if (newX < this.center.x - this.earthDiameter) {
      newX = this.center.x + this.earthDiameter;
    }

    newX = newX - dx;
    this.properties.x = newX;
    this.draw(ctx);
  };
}

export default Land;
