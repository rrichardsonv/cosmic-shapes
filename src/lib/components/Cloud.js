import { TAU } from './constants';

class Cloud {
  constructor({ x, y, dx, width, length, center, size }) {
    this.properties = { x, y, dx, width, length };
    this.center = center;
    this.earthRadius = size;
    this.earthDiameter = size * 2;
  }

  draw = canvas => {
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
    canvas.lineTo(x + length, this.y);
    canvas.strokeStyle = 'white';
    canvas.stroke();
    canvas.restore();
  };

  update = canvas => {
    const { x, dx } = this.properties;
    let newX = x;

    if (newX < this.center.x - this.earthDiameter) {
      newX = this.center.x + this.earthRadius;
    }

    newX = newX - dx;
    this.x = newX;
    this.draw(canvas);
  };
}

export default Cloud;
