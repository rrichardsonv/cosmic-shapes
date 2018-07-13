import Goo from './components/Goo';
import { prepareEcosystem } from './utilities/geometryHelpers';

const getDefaultGooProps = fillColor => ({
  qty: 25,
  maxW: 25,
  minW: 10,
  maxL: 30,
  minL: 18,
  maxSpeed: 0,
  minSpeed: 0.5,
  sample: [{ x: 20, y: 10 }],
  fillColor,
});

const DEFAULT_CENTER_COORDS = { x: 240, y: 240 };
const DEFAULT_MASK_DIAMETER = 240;

class Animation {
  constructor() {
    this.animationId = null;
    this.gooBlobs = [];
    this.ctx = null;
    // This gets a bit weird with arrow functions and requestAnimationFrame
    this.animateBlobs = this.animateBlobs.bind(this);
  }

  setCanvasContext = () => {
    const canvas = document.getElementById('c');
    this.ctx = canvas.getContext('2d');
  };

  run = color => {
    this.gooBlobs = prepareEcosystem(
      Goo,
      getDefaultGooProps(color),
      DEFAULT_MASK_DIAMETER,
      DEFAULT_CENTER_COORDS
    );
    this.animationId = this.animateBlobs();
  };

  cancel = () => {
    if (this.animatationId !== null) {
      this.gooBlobs = [];
      this.animationId = null;
      cancelAnimationFrame(this.animationId);
    }
  };

  animateBlobs() {
    for (let i = 0; i < this.gooBlobs.length; i++) {
      this.gooBlobs[i].update(this.ctx);
    }
    this.animationId = requestAnimationFrame(this.animateBlobs);
  }
}

export default Animation;
