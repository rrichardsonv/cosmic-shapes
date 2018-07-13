class SemiCircle {
  constructor({ x, y, radius, fillColor }) {
    this.properties = { x, y, radius, fillColor };
  }

  draw = canvas => {
    const { x, y, radius, fillColor } = this.properties;
    canvas.beginPath();
    canvas.arc(x, y, radius, Math.PI * 1.5, 1.5, false);
    canvas.fillStyle = fillColor;
    canvas.fill();
  };
}

export default SemiCircle;
