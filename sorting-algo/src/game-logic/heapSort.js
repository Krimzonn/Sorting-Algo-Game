function heapify(arr, n, i, steps) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    steps.push([...arr]);

    heapify(arr, n, largest, steps);
  }
}

function heapSort(arr, size) {
  let steps = [];
  const sorted = [...arr].sort((a, b) => a - b);

  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(arr, size, i, steps);
  }

  for (let i = size - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    steps.push([...arr]);

    if (i > 1) {
      heapify(arr, i, 0, steps);
    }
  }

  const firstSortedIndex = steps.findIndex(
    (step) => JSON.stringify(step) === JSON.stringify(sorted),
  );

  return firstSortedIndex !== -1 ? steps.slice(0, firstSortedIndex + 1) : steps;
}

export default heapSort;
