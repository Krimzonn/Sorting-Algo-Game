import bubbleSort from "../game-logic/bubbleSort";
import heapSort from "../game-logic/heapSort";
import insertionSort from "../game-logic/insertionSort";
import quickSort from "../game-logic/quickSort";
import selectionSort from "../game-logic/selectionSort";

function TopBar({ algorithm, timeLeft, playerscore, botscore }) {
  const algoNames = {
    bubbleSort: "Bubble Sort",
    insertionSort: "Insertion Sort",
    selectionSort: "Selection Sort",
    quickSort: "Quick Sort",
    heapSort: "Heap Sort",
  };

  return (
    <>
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-700 rounded-2xl px-8 py-4 w-full">
        <p className="text-fuchsia-500 font-bold text-lg ">
          {algoNames[algorithm] || algorithm}
        </p>
        <p
          className={`font-bold text-3xl ${timeLeft < 10 ? "text-red-500" : "text-white"}`}
        >
          {timeLeft}
        </p>
        <div className="flex flex-row gap-8 items-center">
          <div className="bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-2">
            <p className="text-cyan-400 font-bold">You: {playerscore}</p>
          </div>
          <div className="bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-2">
            <p className="text-orange-400 font-bold">Bot: {botscore}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
