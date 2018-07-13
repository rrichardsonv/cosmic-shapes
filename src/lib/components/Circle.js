import { TAU } from './constants';

class Circle {
  constructor({ x, y, radius, fillColor }) {
    this.properties = {
      x,
      y,
      radius,
      fillColor,
    };
  }

  draw = canvas => {
    const { x, y, radius, fillColor } = this.properties;

    canvas.beginPath();
    canvas.arc(x, y, radius, 0, TAU, false);
    canvas.fillStyle = fillColor;
    canvas.fill();
  };
}

export default Circle;
