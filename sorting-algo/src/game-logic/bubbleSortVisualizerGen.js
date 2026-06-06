function bubbleSortVisualizerGen(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sorted = new Set();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        isSwapped: false,
        sorted: [...sorted],
      });

      if (a[j] > a[j + 1]) {
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;

        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          isSwapped: true,
          sorted: [...sorted],
        });
      }
    }

    sorted.add(n - 1 - i);
  }

  steps.push({
    array: [...a],
    comparing: [],
    isSwapped: false,
    sorted: [...sorted],
  });

  return steps;
}

export default bubbleSortVisualizerGen;
