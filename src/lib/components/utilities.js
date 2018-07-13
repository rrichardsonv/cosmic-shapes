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

// function earthMask(samples) {
//   var bestCandidate,
//     bestDistance = 0;
//   //The higher the iteration the better the distribution
//   //Performance takes a hit with higher iteration
//   for (var i = 0; i < 20; ++i) {
//     var c = [
//         Math.floor(Math.random() * (center.x + 240 - (center.x - 240) + 1)) + (center.x - 240),
//         Math.floor(Math.random() * (center.y + 120 - (center.y - 120) + 1)) + (center.y - 120),
//       ],
//       d = distance(findClosest(samples, c), c);
//     if (d > bestDistance) {
//       bestDistance = d;
//       bestCandidate = c;
//     }
//   }
//   return bestCandidate;
// }
