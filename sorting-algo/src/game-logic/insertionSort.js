function insertionSort(arr, size)
{
   const steps = [];

   for (let i = 1; i < size; i++)
   {
     const el = arr[i];
     let left = i - 1;

     while (left >= 0 && arr[left] > el)
     {
        arr[left + 1] = arr[left];
        left--;
     }

     arr[left + 1] = el;

     steps.push([...arr]);
   }

   return steps;
}

export default insertionSort;