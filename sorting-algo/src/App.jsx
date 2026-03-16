import randArrGen from './game-logic/arrayGenerator.js'
import bubbleSort from './game-logic/bubbleSort.js'
import selectionSort from './game-logic/selectionSort'
import insertionSort from './game-logic/insertionSort'

const arr = randArrGen(5);
console.log("Original 1:", arr);

const steps = bubbleSort([...arr], 5);
console.log("Steps 1:", steps);

const arr2 = randArrGen(8);
console.log("Original 2:", arr2);

const steps2 = selectionSort([...arr2], 8);
console.log("Selection Steps 2:", steps2);

const arr3 = randArrGen(5);
console.log("Original 3:", arr3);

const steps3 = insertionSort([...arr3], 5);
console.log("Insertion Steps 3:", steps3);

function App()
{
  return <div>Test</div>
}

export default App;