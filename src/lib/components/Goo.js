import { TAU, DEFAULT_FILL_COLOR } from '../utilities/constants';

class Goo {
  constructor({ x, y, dx, width, length, center, size, fillColor }) {
    this.properties = { x, y, dx, width, length, fillColor: fillColor || DEFAULT_FILL_COLOR };
    this.center = center;
    this.earthRadius = size;
    this.earthDiameter = size * 2;
  }

  draw = ctx => {
    const { x, y, length, width, fillColor } = this.properties;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.earthRadius, 0, TAU, false);
    ctx.clip();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineWidth = width;
    ctx.lineTo(x + length, y);
    ctx.strokeStyle = fillColor;
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

export default Goo;
