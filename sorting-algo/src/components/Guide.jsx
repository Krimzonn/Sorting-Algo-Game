import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const guideData = {
  bubbleSort: {
    name: "Bubble Sort",
    complexity: "O(n²)",
    difficulty: "Beginner",
    description:
      "Bubble Sort compares neighboring elements and swaps them if they are in the wrong order. It repeats this process until the array is sorted. It takes two loops, one for passes and the other for comparison.",
    rules: [
      "Only swap adjacent (neighboring) cards",
      "Always compare left to right",
      "Each pass moves the largest unsorted element to the end",
    ],
    example: [
      [3, 1, 4, 2],
      [1, 3, 4, 2],
      [1, 3, 2, 4],
      [1, 2, 3, 4],
    ],
  },
  selectionSort: {
    name: "Selection Sort",
    complexity: "O(n²)",
    difficulty: "Beginner",
    description:
      "Selection Sort finds the smallest element in the unsorted portion and swaps it into its correct position. It repeats this until the array is sorted.",
    rules: [
      "Find the minimum element in the unsorted portion",
      "Swap it with the first unsorted element",
      "The sorted portion grows one element at a time from the left",
    ],
    example: [
      [4, 2, 1, 3],
      [1, 2, 4, 3],
      [1, 2, 4, 3],
      [1, 2, 3, 4],
    ],
  },
  insertionSort: {
    name: "Insertion Sort",
    complexity: "O(n²)",
    difficulty: "Intermediate",
    description:
      "Insertion Sort builds a sorted array one element at a time by inserting each new element into its correct position among the already sorted elements.",
    rules: [
      "Pick up each element one by one",
      "Slide it left until it reaches its correct position",
      "Elements to the left are always sorted",
    ],
    example: [
      [3, 1, 4, 2],
      [1, 3, 4, 2],
      [1, 3, 4, 2],
      [1, 2, 3, 4],
    ],
  },
  quickSort: {
    name: "Quick Sort",
    complexity: "O(n log n)",
    difficulty: "Advanced",
    description:
      "Quick Sort picks a pivot element and partitions the array so all smaller elements are on the left and larger on the right. It recursively sorts both sides.",
    rules: [
      "Last element is always the pivot",
      "Move elements smaller than pivot to the left",
      "Pivot ends up in its final correct position after each partition",
    ],
    example: [
      [3, 6, 1, 4],
      [1, 6, 3, 4],
      [1, 3, 6, 4],
      [1, 3, 4, 6],
    ],
  },
  heapSort: {
    name: "Heap Sort",
    complexity: "O(n log n)",
    difficulty: "Advanced",
    description:
      "Heap Sort first builds a max heap from the array, then repeatedly extracts the largest element and places it at the end, rebuilding the heap each time.",
    rules: [
      "First build a max heap — every parent must be larger than its children",
      "Swap the root with the last unsorted element",
      "Re-heapify after each extraction",
    ],
    example: [
      [3, 1, 4, 2],
      [4, 1, 3, 2],
      [4, 3, 1, 2],
      [1, 3, 4, 2],
    ],
  },
};

function Guide() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("bubbleSort");

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <div className="w-64 bg-zinc-900 border-r border-zinc-700 p-6 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-fuchsia-400 mb-5">
          Algorithm Guide
        </h2>
        {[
          "bubbleSort",
          "selectionSort",
          "insertionSort",
          "quickSort",
          "heapSort",
        ].map((algo) => (
          <button
            key={algo}
            onClick={() => setSelected(algo)}
            className={`text-left px-4 py-3 rounded-xl font-bold transition-all duration-200 ${selected === algo ? "bg-fuchsia-500 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}
          >
            {algo}
          </button>
        ))}

        <button
          className="mt-auto border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-4 py-3 rounded-xl transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          BACK TO MENU
        </button>
      </div>
      <div className="flex-1 p-10 overflow-y-auto">
        {guideData[selected] && (
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-4xl font-bold text-white">
                {guideData[selected].name}
              </h1>
              <span className="text-xs font-mono px-3  py-1 rounded-full bg-fuchsia-900 text-fuchsia-300 border border-fuchsia-500">
                {guideData[selected].complexity}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${guideData[selected].difficulty === "Beginner" ? "bg-green-900 text-green-300 border border-green-500" : guideData[selected].difficulty === "Intermediate" ? "bg-yellow-900 text-yellow-300 border border-yellow-500" : "bg-red-900 text-red-300 border border-red-500"}`}
              >
                {guideData[selected].difficulty}
              </span>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-fuchsia-400 mb-3">
                What Is It?
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                {guideData[selected].description}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-fuchsia-400 mb-3">
                How To Play
              </h2>
              <ul className="flex flex-col">
                {guideData[selected].rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <span className="text-fuchsia-500 font-bol">{i + 1}</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Guide;
