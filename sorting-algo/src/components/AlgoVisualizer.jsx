import { useState, useEffect } from "react";
import bubbleSortVisualizerGen from "../game-logic/bubbleSortVisualizerGen";
import selectionSortVisualizerGen from "../game-logic/selectionSortVisualizerGen";
import insertionSortVisualizerGen from "../game-logic/insertionSortVisualizerGen";
import randArrGen from "../game-logic/arrayGenerator";
import { useParams, useNavigate } from "react-router-dom";

/*
--------------------------------------------------
Below here is the 'Data Set' for the Code Snippets
--------------------------------------------------
*/

const codeSnippets = {
  bubbleSort: {
    description:
      "Bubble sort utilizes two loops: The outer one for passes and the inner for comparison. Inside the inner loop, swapping only takes place if the previous number is greater than the number in front of it otherwise it is skipped.",
    cpp: `for (int i = 0; i < size; i++) 
{
  for (int j = 0; j < size - i - 1; j++) 
  { 
    if (arr[j] > arr[j + 1]) 
    {
       int temp = arr[j]; 
       arr[j] = arr[j + 1]; 
       arr[j + 1] = temp;
    }
  } 
}`,
    js: `for (let i = 0; i < size; i++)
{
  for (let j = 0; j < size - i - 1; j++)
  {
    if (arr[j] > arr[j + 1])
    {
       let temp = arr[j];
       arr[j] = arr[j + 1];
       arr[j + 1] = temp;
    }
  }
}`,
  },
  selectionSort: {
    description:
      "The Selection Sort algorithm works by finding the smallest number and putting it in it's correct index. The outer loop tracks the current position being filled, while the inner loop searches through the remaining unsorted elements to find the minimum index. Once the minimum is found, a single swap places it into position.",
    cpp: `for (int i = 0; i < size; i++)
{
  int minIndex = i;

  for (int j = i + 1; j < size; j++)
  {
     if (arr[j] < arr[minIndex])
     {
       minIndex = j;
     }
  }  

      int temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
}`,
    js: `for (let i = 0; i < size; i++)
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
}`,
  },
  insertionSort: {
    description: "",
    cpp: ``,
    js: ``,
  },
};

const algoNames = {
  bubbleSort: "Bubble Sort",
  selectionSort: "Selection Sort",
  insertionSort: "Insertion Sort",
  heapSort: "Heap Sort",
  quickSort: "Quick Sort",
  mergeSort: "Merge Sort",
};

const algoMapGen = {
  bubbleSort: bubbleSortVisualizerGen,
  selectionSort: selectionSortVisualizerGen,
  insertionSort: insertionSortVisualizerGen,
};

/*
--------------------------------------------------
Above here is the 'Data Set' for the Code Snippets
--------------------------------------------------
*/

function AlgoVisualizer() {
  const { algoId } = useParams();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [array, setArray] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState("cpp");

  const navigate = useNavigate();

  /*
  -------------------------------------------------
  Below here are all the required useEffect hooks
  -------------------------------------------------
  */

  useEffect(() => {
    const arr = randArrGen(8);
    setArray(arr);
    const generator = algoMapGen[algoId];
    setSteps(generator(arr));
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  /*
  -------------------------------------------------
  Abover here are all the required useEffect hooks
  -------------------------------------------------
  */

  const snap = steps[currentStep];

  if (!snap) {
    return <div className="text-white p-12">Loading...</div>;
  }

  /*
  -------------------------------------------------
  Below here are all the required functions
  -------------------------------------------------
  */

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep >= 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    const arr = randArrGen(8);
    setArray(arr);
    const generator = algoMapGen[algoId];
    setSteps(generator(arr));
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const narration = (snap) => {
    if (snap.isSwapped) {
      return `Swapped ${snap.array[snap.comparing[0]]} and ${snap.array[snap.comparing[1]]}`;
    }

    if (snap.comparing.length > 0) {
      return `Comparing ${snap.array[snap.comparing[0]]} and ${snap.array[snap.comparing[1]]}`;
    }

    return "Array is sorted!";
  };

  /*
  -------------------------------------------------
  Above here are all the required functions
  -------------------------------------------------
  */

  const setColor = snap.isSwapped
    ? "text-yellow-500"
    : snap.comparing.length === 0
      ? "text-green-400"
      : "text-zinc-300";

  return (
    <div className="min-h-screen bg-black text-white p-7">
      {showCode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-2/5 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">
                {algoNames[algoId]} - Code
              </h2>
              <button
                className="text-zinc-400 hover:text-white font-mono"
                onClick={() => setShowCode(false)}
              >
                Close ✕
              </button>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {codeSnippets[algoId].description}
            </p>

            <div className="flex gap-3">
              <button
                className={`flex-1 py-2 rounded-lg font-mono font-bold flex items-center justify-center gap-2 ${activeTab === "cpp" ? "bg-purple-500 text-white" : "bg-zinc-800 text-zinc-500"}`}
                onClick={() => setActiveTab("cpp")}
              >
                <img src="/c-.png" alt="C++ icon" className="w-5 h-5"></img>
                C++
              </button>
              <button
                className={`flex-1 py-2 rounded-lg font-mono font-bold text-black flex items-center justify-center gap-2 ${activeTab === "js" ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-500"}`}
                onClick={() => setActiveTab("js")}
              >
                <img src="/js.png" alt="JS icon" className="w-5 h-5"></img>
                JavaScript
              </button>
            </div>

            <pre className="bg-zinc-950 text-green-400 text-sm font-mono whitespace-pre overflow-x-auto p-4 rounded-xl">
              {activeTab === "cpp"
                ? codeSnippets[algoId]?.cpp
                : codeSnippets[algoId]?.js}
            </pre>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/visualizer")}
          className="border border-zinc-600 text-zinc-600 hover:border-white hover:text-white px-4 py-2 rounded-lg font-mono text-sm transition-all"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold font-serif">{algoNames[algoId]}</h1>
        <button
          onClick={() => setShowCode(true)}
          className="bg-white text-black px-5 py-4 rounded-md text-lg font-mono hover:bg-zinc-500 hover:text-white hover:opacity-80 transition-all duration-300 cursor-pointer"
        >
          Show Code
        </button>
      </div>

      {/*
       Below is the Code for the Bars
     */}
      <div
        className="flex items-end gap-2 h-64 mt-10"
        style={{ height: "300px" }}
      >
        {snap.array.map((val, i) => {
          const isSorted = snap.sorted.includes(i);
          const isComparing = snap.comparing.includes(i);
          const heightPercent = (val / Math.max(...snap.array)) * 260;

          const color = isSorted
            ? "bg-green-400"
            : isComparing
              ? "bg-yellow-400"
              : "bg-zinc-400";

          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-xs text-zinc-400">{val}</span>
              <div
                className={`w-full rounded-t-md transition-all duration-300 ${color}`}
                style={{ height: `${heightPercent}px` }}
              ></div>
            </div>
          );
        })}
      </div>
      {/*
       Above is the Code for the Narration Box
       ---------------------------------------
     */}

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded-sm bg-zinc-400"></div>
          <span className="text-xs font-mono text-zinc-500">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded-sm bg-yellow-400"></div>
          <span className="text-xs font-mono text-zinc-500">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded-sm bg-green-400"></div>
          <span className="text-xs font-mono text-zinc-500">Sorted</span>
        </div>
      </div>

      {/*
       Below is the Code for the Narration Box
     */}
      <div
        className={`mt-6 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm ${setColor}`}
      >
        {narration(snap)}
      </div>
      {/*
       Above is the Code for the Narration Box
       ---------------------------------------
     */}

      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all font-mono"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={handleStepForward}
          disabled={currentStep >= steps.length - 1}
          className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono disabled:opacity-30 flex items-center justify-center gap-2"
        >
          Step
          <img
            src="/fast-forward-media-control-button.png"
            className="w-5 h-5 invert opacity-60"
          ></img>
        </button>

        <button
          onClick={handleStepBackward}
          disabled={currentStep <= 0}
          className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono disabled:opacity-30 flex items-center justfiy-center gap-2"
        >
          Step
          <img src="/previous.png" className="w-5 h-5 invert opacity-60"></img>
        </button>

        <button
          onClick={handleReset}
          className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono disabled:opacity-30 flex items-center justfiy-center gap-2"
        >
          Reset{" "}
          <img src="/undo.png" className="w-5 h-5 invert opacity-60"></img>
        </button>

        <span className="ml-auto text-zinc-500 font-mono text-lg">
          {currentStep} / {steps.length - 1}
        </span>
      </div>
    </div>
  );
}

export default AlgoVisualizer;
