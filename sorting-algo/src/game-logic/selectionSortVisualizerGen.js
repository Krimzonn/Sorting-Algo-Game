function selectionSortVisualizerGen(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sorted = new Set();

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...a],
        comparing: [j, minIndex],
        isSwapped: false,
        sorted: [...sorted],
      });

      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }

    let temp = a[i];
    a[i] = a[minIndex];
    a[minIndex] = temp;

    steps.push({
      array: [...a],
      comparing: [i, minIndex],
      isSwapped: true,
      sorted: [...sorted],
    });

    sorted.add(i);
  }

  steps.push({
    array: [...a],
    comparing: [],
    isSwapped: false,
    sorted: [...sorted],
  });

  return steps;
}

export default selectionSortVisualizerGen;
