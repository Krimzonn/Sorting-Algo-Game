function quickSortVisualizerGen(arr) {
  const steps = [];
  const a = [...arr];
  const sorted = new Set();

  quickSortHelper(a, 0, a.length - 1, steps, sorted);

  for (let k = 0; k < a.length; k++) {
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

function partition(a, low, high, steps, sorted) {
  const pivot = a[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    steps.push({
      array: [...a],
      comparing: [j, high],
      isSwapped: false,
      sorted: [...sorted],
    });

    if (a[j] <= pivot) {
      i++;

      let temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }

  let temp = a[i + 1];
  a[i + 1] = a[high];
  a[high] = temp;

  sorted.add(i + 1);

  steps.push({
    array: [...a],
    comparing: [i + 1, high],
    isSwapped: true,
    sorted: [...sorted],
  });

  return i + 1;
}

function quickSortHelper(a, low, high, steps, sorted) {
  if (low < high) {
    const pivotIndex = partition(a, low, high, steps, sorted);
    quickSortHelper(a, low, pivotIndex - 1, steps, sorted);
    quickSortHelper(a, pivotIndex + 1, high, steps, sorted);
  }
}

export default quickSortVisualizerGen;
