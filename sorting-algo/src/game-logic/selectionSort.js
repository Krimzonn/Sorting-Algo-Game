function selectionSort(arr, size)
{
  const steps = [];

  for (let i = 0; i < size; i++)
  {
    let minIndex = i;

    for (let j = i + 1; j < size; j++)
    {
      if (arr[j] < arr[minIndex])
      {
         minIndex = j;
      }
    }

    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    steps.push([...arr]);
  }

  return steps;
}

export default selectionSort;