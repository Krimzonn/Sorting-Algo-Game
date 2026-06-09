function heapSortVisualizerGen(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sorted = new Set();

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(a, n, i, steps, sorted);
  }

  for (let i = n - 1; i > 0; i--) {
    let temp = a[0];
    a[0] = a[i];
    a[i] = temp;

    sorted.add(i);

    steps.push({
      array: [...a],
      comparing: [0, i],
      isSwapped: true,
      sorted: [...sorted],
    });

    heapify(a, i, 0, steps, sorted);
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

function heapify(a, n, i, steps, sorted) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && a[left] > a[largest]) {
    largest = left;
  }

  if (right < n && a[right] > a[largest]) {
    largest = right;
  }

  if (largest != i) {
    steps.push({
      array: [...a],
      comparing: [i, largest],
      isSwapped: false,
      sorted: [...sorted],
    });

    let temp = a[i];
    a[i] = a[largest];
    a[largest] = temp;

    steps.push({
      array: [...a],
      comparing: [i, largest],
      isSwapped: true,
      sorted: [...sorted],
    });

    heapify(a, n, largest, steps, sorted);
  }
}

export default heapSortVisualizerGen;
