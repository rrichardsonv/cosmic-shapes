import { TAU } from './constants';

const LAND_COLOR = '#85cc66';

class Land {
  constructor({ x, y, dx, width, length, center, size }) {
    this.properties = { x, y, dx, width, length };
    console.log(this.properties);
    this.center = center;
    this.earthRadius = size;
    this.earthDiameter = size * 2;
  }

  draw = (canvas, newX = null) => {
    const { x, y, length, width } = this.properties;
    console.log(`drawing land at x:${x} y: ${y}`);
    canvas.save();
    canvas.beginPath();
    canvas.arc(this.center.x, this.center.y, this.earthRadius, 0, TAU, false);
    canvas.clip();
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineCap = 'round';
    canvas.lineWidth = width;
    canvas.lineTo(x + length, y);
    canvas.strokeStyle = LAND_COLOR;
    canvas.stroke();
    canvas.restore();
  };

  update = canvas => {
    const { x, dx } = this.properties;
    let newX = x;

    if (newX < this.center.x - this.earthDiameter) {
      newX = this.center.x + this.earthDiameter;
    }

    newX = newX - dx;
    this.x = newX;
    this.draw(canvas);
  };
}

export default Land;
