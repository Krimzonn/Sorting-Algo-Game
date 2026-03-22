function merge(left, right, fullArr, offSet, steps) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  result.forEach((val, idx) => {
    fullArr[offSet + idx] = val;
  });

  steps.push({
    arr: [...fullArr],
    activeRange: [offSet, offSet + result.length - 1],
  });

  return result;
}

function mergeSortHelper(arr, fullArr, offSet, steps) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortHelper(arr.slice(0, mid), fullArr, offSet, steps);
  const right = mergeSortHelper(arr.slice(mid), fullArr, offSet + mid, steps);

  return merge(left, right, fullArr, offSet, steps);
}

function mergeSort(arr, size) {
  const steps = [];
  const fullArr = [...arr];
  mergeSortHelper(arr, fullArr, 0, steps);

  return steps;
}

export default mergeSort;
