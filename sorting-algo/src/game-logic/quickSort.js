function partition(arr, low, high, steps) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;

      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      steps.push([...arr]);
    }
  }

  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  steps.push([...arr]);

  return i + 1;
}

function quickSortHelper(arr, low, high, steps) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, steps);
    quickSortHelper(arr, low, pivotIndex - 1, steps);
    quickSortHelper(arr, pivotIndex + 1, high, steps);
  }
}

function quickSort(arr, size) {
  const steps = [];
  quickSortHelper(arr, 0, size - 1, steps);
  return steps;
}

export default quickSort;
