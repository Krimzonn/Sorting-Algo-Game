import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    label: "Sorting Algorithms",
    algorithms: [
      {
        id: "bubbleSort",
        name: "Bubble Sort",
        complexity: "O(n²)",
        difficulty: "Beginner",
        description: "Compares adjacent elements and swaps them until sorted.",
      },
      {
        id: "selectionSort",
        name: "Selection Sort",
        complexity: "O(n²)",
        difficulty: "Beginner",
        description:
          "Finds the minimum element and places it at the front each pass.",
      },
      {
        id: "insertionSort",
        name: "Insertion Sort",
        complexity: "O(n²)",
        difficulty: "Intermediate",
        description:
          "Builds a sorted array one element at a time by inserting into position.",
      },
      {
        id: "quickSort",
        name: "Quick Sort",
        complexity: "O(n log n)",
        difficulty: "Advanced",
        description:
          "Partitions the array around a pivot and recursively sorts each side.",
      },
      {
        id: "heapSort",
        name: "Heap Sort",
        complexity: "O(n log n)",
        difficulty: "Advanced",
        description:
          "Builds a max heap then repeatedly extracts the largest element.",
      },
    ],
  },
  {
    label: "Linear Data Structures",
    algorithms: [
      {
        id: "stack",
        name: "Stack",
        complexity: "O(1)",
        difficulty: "Beginner",
        description:
          "A last-in first-out structure where elements are pushed and popped from the top.",
      },
      {
        id: "queue",
        name: "Queue",
        complexity: "O(1)",
        difficulty: "Beginner",
        description:
          "A first-in first-out structure where elements are enqueued at the back and dequeued from the front.",
      },
      {
        id: "linkedList",
        name: "Linked List",
        complexity: "O(n)",
        difficulty: "Intermediate",
        description:
          "A sequence of nodes where each node holds a value and a pointer to the next node in the chain.",
      },
    ],
  },
  {
    label: "Searching Algorithms",
    algorithms: [
      {
        id: "binarySearch",
        name: "Binary Search",
        complexity: "O(log n)",
        difficulty: "Beginner",
        description:
          "Repeatedly halves a sorted array to locate a target value.",
      },
      {
        id: "linearSearch",
        name: "Linear Search",
        complexity: "O(n)",
        difficulty: "Beginner",
        description:
          "Scans each element one by one until the target is found or the array ends.",
      },
    ],
  },
];

function Visualizer() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      algorithms: category.algorithms.filter((algo) =>
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.algorithms.length > 0);

  return (
    <div className="min-h-screen bg-black text-white playfair p-12">
      <div className="mb-8 bg-zinc-300/10 px-8 py-6">
        <h1 className="text-6xl font-bold">Algorithm Visualizer</h1>
        <p className="text-zinc-400 mt-2 text-lg">
          Watch the algorithms work behind the scenes
        </p>

        <input
          type="text"
          placeholder="Search algorithms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-900  border border-zinc-600 text-white font-mono  px-4 py-2 rounded-lg w-full mt-6 focus:outline-none focus:border-white"
        />
      </div>

      <hr className="w-full bg-zinc-600"></hr>

      {filteredCategories.map((category) => (
        <div key={category.label} className="mb-12">
          <div className="flex items-center gap-4 mt-8 mb-6">
            <h2 className="text-xl font-mono text-zinc-500 uppercase tracking-widest font-bold">
              {category.label}
            </h2>
            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-4 gap-10 mt-6 justify-items-center">
            {category.algorithms.map((algo) => (
              <div
                key={algo.id}
                className="bg-zinc-900 border border-zinc-600 rounded-xl p-6 w-60 text-center text-white flex flex-col h-full hover:border-zinc-400 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-full h-px bg-white mb-4"></div>
                <h2 className="font-bold text-2xl">{algo.name}</h2>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="text-sm font-mono border border-zinc-500 text-zinc-400 px-2 py-1 rounded-full">
                    {algo.complexity}
                  </span>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded-full border ${algo.difficulty === "Beginner" ? "border-green-500 text-green-400" : algo.difficulty === "Intermediate" ? "border-yellow-500 text-yellow-400" : "border-red-500 text-red-400"}`}
                  >
                    {algo.difficulty}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
                  {algo.description}
                </p>
                <div className="mt-auto pt-6">
                  <button
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold px-6 py-3 rounded-xl mt-10"
                    onClick={() => navigate(`/visualizer/${algo.id}`)}
                  >
                    Visualize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Visualizer;
