import randArrGen from './game-logic/arrayGenerator.js'
import bubbleSort from './game-logic/bubbleSort.js'
import selectionSort from './game-logic/selectionSort'

const arr = randArrGen(5);
console.log("Original 1:", arr);

const steps = bubbleSort([...arr], 5);
console.log("Steps 1:", steps);

const arr2 = randArrGen(8);
console.log("Original 2:", arr2);

const steps2 = selectionSort([...arr2], 8);
console.log("Selection Steps 2:", steps2);


function App()
{
  return <div>Test</div>
}

export default App;