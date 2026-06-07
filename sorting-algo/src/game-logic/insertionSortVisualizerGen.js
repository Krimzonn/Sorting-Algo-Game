function insertionSortVisualizerGen(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sorted = new Set();

  for (let i = 1; i < n; i++) {
    let j = i - 1;

    while (j >= 0 && a[j] > a[j + 1]) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        isSwapped: false,
        sorted: [...sorted],
      });

      let temp = a[j];
      a[j] = a[j + 1];
      a[j + 1] = temp;

      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        isSwapped: true,
        sorted: [...sorted],
      });

      j--;
    }

    for (let k = 0; k <= i; k++) {
      sorted.add(k);
    }
  }

  for (let k = 0; k < n; k++) {
    sorted.add(k);
  }

  steps.push({
    array: [...a],
    comparing: [],
    isSwapped: false,
    sorted: [...sorted],
  });

  return steps;
}

export default insertionSortVisualizerGen;
