export const triangulate = (dx, dy) => Math.sqrt(dx * dx + dy + dy);

export const getDistance = (a, b) => {
  const [dx, dy] = [a.x - b[0], a.y - b[1]];
  return triangulate(dx, dy);
};

export const findClosest = (points, b) => {
  let distance = null;
  let closestPoint;
  let iteration = -1;
  const length = points.length;
  while (++iteration < length) {
    const dx = points[iteration].x - b[0];
    const dy = points[iteration].y - b[1];
    const dz = triangulate(dx, dy);

    if (distance === null || distance > dz) {
      distance = dz;
      closestPoint = points[iteration];
    }
  }

  return closestPoint;
};

export const rollCandidate = (point, offset) => {
  return Math.floor(Math.random() * (point + offset - (point - offset) + 1)) + (point - offset);
};

export const earthMask = (samples, size, center) => {
  let iteration = -1;
  let bestCandidate,
    bestDistance = 0;
  while (++iteration < 20) {
    const candidate = [rollCandidate(center.x, size * 2), rollCandidate(center.y, size)];
    const distance = getDistance(findClosest(samples, candidate), candidate);

    if (distance > bestDistance) {
      bestDistance = distance;
      bestCandidate = candidate;
    }
  }

  return bestCandidate;
};

function random(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function prepareEcosystem(Component, props, size, center) {
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
