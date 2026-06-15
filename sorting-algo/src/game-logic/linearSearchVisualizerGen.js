function linearSearchVisualizerGen(arr, target) {
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        current: i,
        found: true,
        target: target,
      });

      return steps;
    }
    steps.push({ array: [...arr], current: i, found: false, target: target });
  }

  steps.push({
    array: [...arr],
    current: -1,
    found: false,
    target: target,
  });

  return steps;
}

export default linearSearchVisualizerGen;
