function binarySearchVisualizerGen(arr, target) {
  const steps = [];
  const a = [...arr].sort((x, y) => x - y);
  let low = 0;
  let high = a.length - 1;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      array: [...a],
      low: low,
      mid: mid,
      high: high,
      found: false,
      target: target,
    });

    if (a[mid] === target) {
      steps.push({
        array: [...a],
        low: low,
        mid: mid,
        high: high,
        found: true,
        target: target,
      });

      found = true;
      break;
    } else if (a[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      array: [...a],
      low: -1,
      mid: -1,
      high: -1,
      found: false,
      target: target,
    });
  }

  return steps;
}

export default binarySearchVisualizerGen;
