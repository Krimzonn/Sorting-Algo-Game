function randArrGen(arr, size)
{
  

  for (let i = 0; i < size; i++)
  {
    arr[i] = i + 1;
  }

  for (let j = size - 1; j > 0; j--)
  {
    const randInd = Math.floor(Math.random() * (j + 1));
    const temp = arr[j];
    arr[j] = arr[randInd];
    arr[randInd] = temp;
  }

  return arr;
}

export default randArrGen;