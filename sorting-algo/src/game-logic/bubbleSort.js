function bubbleSort(arr, size)
{
  const steps = [];

  for (let i = 0; i < size; i++)
  {
    for (let j = 0; j < size - i -1; j++)
    {
        if (arr[j] > arr[j + 1])
        {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            steps.push([...arr]);
        }
    }
  }

  return steps;
}

export default bubbleSort;