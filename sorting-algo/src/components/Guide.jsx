import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const guideData = {
  bubbleSort: {
    name: "Bubble Sort",
    complexity: "O(n²)",
    difficulty: "Beginner",
    description:
      "Bubble Sort compares neighboring elements and swaps them if they are in the wrong order. It repeats this process until the array is sorted. \nIt takes two loops, one for passes and the other for comparison.",
    rules: [
      "Only swap adjacent (neighboring) cards.",
      "Always compare left to right.",
      "Each pass moves the largest unsorted element to the end.",
    ],
    concepts: [
      {
        term: "Adjacent Swaps",
        color: "red",
        description:
          "Bubble Sort only ever swaps two neighboring elements. You cannot skip over elements; every swap must be between cards sitting next to each other.",
      },
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
      "Find the minimum element in the unsorted portion.",
      "Swap it with the first unsorted element.",
      "The sorted portion grows one element at a time from the left.",
    ],
    concepts: [
      {
        term: "Minimum Elements",
        color: "red",
        description:
          "In each pass, Selection Sort scans the entire unsorted portion to find the smallest element, then places it at the front (i.e start of the array) of the unsorted section.",
      },
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
    concepts: [
      {
        term: "Sorted Subarray",
        color: "red",
        description:
          "Insertion Sort maintains a sorted portion on the left side. Each new element gets inserted into its correct position within this already-sorted portion (i.e the left side).",
      },
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
    concepts: [
      {
        term: "Pivot Element",
        color: "red",
        description:
          "It is the chosen reference element. Everything smaller goes left, everything larger goes right. By default the last element in the array is the reference element. \nThink of it as the 'Nail' in the board.",
      },
      {
        term: "Partitioning",
        color: "blue",
        description:
          "It is the process of rearranging elements around the pivot so it lands in its final sorted position.",
      },
      {
        term: "Time Complexity",
        color: "red",
        description:
          "On average, Quick Sort divides the problem in half each time (log n levels), doing O(n) work per level.",
      },
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
      "Heap Sort first builds a max heap from the array, then repeatedly extracts the largest element and places it at the end, rebuilding the heap each time. \nThis sorting algorithm will go all the way to the end even if the sequence is sorted or not.",
    rules: [
      "First build a max heap — every parent must be larger than its children",
      "Swap the root with the last unsorted element",
      "Re-heapify after each extraction",
    ],
    concepts: [
      {
        term: "Heap",
        color: "red",
        description:
          "A heap (in Heap Sort) is a complete binary tree that satisfies the heap property: \nMax heap ---> every parent node (the point where two numbers branch off another number) is greater than or equal to its children i.e largest number sits at the top. \nMin Heap every parent node (the point where two numbers branch off another number) is smaller than the children so the smallest number sits at the top.",
        highlight:
          "The Root is where either the largest or smallest number sits ---> At the very top. (in an array it is the left most element by default)",
      },
      {
        term: "Heapify",
        color: "blue",
        description:
          "Heapify is the process of rearranging a binary tree (or array) to maintain the heap property by adjusting nodes so each parent satisfies the max-heap or min-heap condition.",
        highlight:
          "Heapify takes place every time the largest element is sent to the last index.",
      },
      {
        term: "Time Complexity",
        color: "red",
        description:
          "On average, Heap Sort divides the problem in half each time (log n levels), doing O(n) work per level.",
      },
    ],
    example: [
      [3, 1, 4, 2],
      [4, 1, 3, 2],
      [4, 2, 3, 1],
      [1, 2, 3, 4],
      [2, 1, 3, 4],
      [1, 2, 3, 4],
    ],
  },
};

const algoNames = {
  bubbleSort: "Bubble Sort",
  selectionSort: "Selection Sort",
  insertionSort: "Insertion Sort",
  quickSort: "Quick Sort",
  heapSort: "Heap Sort",
};

function ConceptCards({ term, color, description, highlight }) {
  const isRed = color === "red";

  return (
    <div
      className={`rounded-xl p-4 border ${isRed ? "bg-red-950 border-red-500" : "bg-blue-950 border-blue-500"}`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-widest mb-2 ${isRed ? "text-red-400" : "text-blue-400"}`}
      >
        {term}
      </p>
      <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
        {description}
      </p>
      {highlight && (
        <p
          className={`mt-3 text-xs font-semibold ${isRed ? "text-red-300" : "text-blue-300"}`}
        >
          {highlight}
        </p>
      )}
    </div>
  );
}

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
            {algoNames[algo]}
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
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
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
                    <span className="text-fuchsia-500 font-bold">{i + 1}</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {guideData[selected].concepts.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-fuchsia-400 mb-4">
                  Key Concepts
                </h2>
                <div className="flex flex-col gap-3">
                  {guideData[selected].concepts.map((c, i) => (
                    <ConceptCards key={i} {...c} />
                  ))}
                </div>
              </div>
            )}

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-fuchsia-400 mb-3">
                Example
              </h2>
              <div className="flex flex-col gap-3">
                {guideData[selected].example.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-zinc-500 text-sm w-16">
                      {i === 0 ? "Start: " : `Step ${i}: `}
                    </span>
                    <div className="flex gap-2">
                      {step.map((num, j) => (
                        <div
                          key={j}
                          className="w-10 h-10 bg-zinc-800 border border-fuchsia-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    {i === guideData[selected].example.length - 1 && (
                      <span className="text-green-400 font-bold">Sorted</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Guide;
