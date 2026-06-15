import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import randArrGen from "../game-logic/arrayGenerator";
import linearSearchVisualizerGen from "../game-logic/linearSearchVisualizerGen";

const codeSnippets = {
  linearSearch: {
    description:
      "Linear search scans the array from left to right, comparing each element to the target one by one. If a match is found, it returns the index. If the entire array is traversed without a match, it concludes the target isn't present. It is useful for small and unsorted arrays.",
    cpp: `#include<iostream>
using namespace std;

int linearSearch(int arr[], int n, int target) 
{    
    for (int i = 0; i < n; i++)        
    {
        if (arr[i] == target) 
        {
            return i;    
        }
    }
        return -1;
}`,
    js: `function linearSearch(arr, target) 
{    for (let i = 0; i < arr.length; i++) 
     {
        if (arr[i] === target) 
        {
            return i;    
        }
     }
        return -1;
}`,
  },
};

function LinearSearchVisualizer() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [targetInput, setTargetInput] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState("cpp");

  const handleSearchStart = () => {
    if (targetInput === "") {
      return;
    }

    const arr = randArrGen(8);
    setArray(arr);
    setSteps(linearSearchVisualizerGen(arr, Number(targetInput)));
    setCurrentStep(0);
    setSearchStarted(true);
  };

  const narration = (snap) => {
    if (snap.found) {
      return `Found ${snap.target} at index ${snap.current}`;
    }
    if (snap.current === -1) {
      return `${snap.target} was not found in the array`;
    }
    return `Checking index ${snap.current}: ${snap.array[snap.current]} ≠ ${snap.target}, moving right...`;
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const snap = steps[currentStep];

  const getBoxColor = (i) => {
    if (!snap) {
      return;
    }
    if (snap.found && i === snap.current) {
      return "bg-green-400 text-black";
    }
    if (i === snap.current) {
      return "bg-yellow-400 text-black";
    }
    if (snap.current !== -1 && i < snap.current) {
      return "bg-zinc-800 text-zinc-600";
    }

    return "bg-zinc-900 text-white border border-zinc-600";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {showCode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-2/5 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">
                Linear Search - Code
              </h2>
              <button
                className="text-zinc-400 hover:text-white font-mono"
                onClick={() => setShowCode(false)}
              >
                Close ✕
              </button>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {codeSnippets.linearSearch.description}
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

            <pre className="bg-zinc-950 text-green-400 text-sm font-mono whitespace-pre overflow-x-auto p-4 rounded-xl max-h-48 overflow-y-auto">
              {activeTab === "cpp"
                ? codeSnippets.linearSearch?.cpp
                : codeSnippets.linearSearch?.js}
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
        <h2 className="text-4xl font-bold font-serif">Linear Search</h2>
        <button
          onClick={() => setShowCode(true)}
          className="bg-white text-black px-5 py-4 rounded-md text-lg font-mono hover:bg-zinc-500 hover:text-white hover:opacity-80 transition-all duration-300 cursor-pointer"
        >
          Show Code
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-20">
        <input
          type="number"
          placeholder="Enter a target value..."
          value={targetInput}
          onChange={(e) => {
            setTargetInput(e.target.value);
          }}
          className="bg-zinc-900 border border-zinc-600 text-white font-mono w-70 px-4 py-2 rounded-lg focus:outline-none focus:border-white"
        ></input>
        <button
          onClick={handleSearchStart}
          className="group border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all font-mono flex items-center gap-2"
        >
          Search
          <img
            src="/search.png"
            className="w-5 h-5 invert opacity-60 group-hover:opacity-100 group-hover:invert-0 transition-all"
          ></img>
        </button>
      </div>

      {searchStarted && (
        <div className="flex flex-col items-center gap-10 mt-10">
          <div className="flex items-center gap-3">
            {snap.array.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-6 text-xs font-mono text-zinc-500">
                  {i === snap.current && "CUR"}
                </div>
                <div
                  className={`w-14 h-14 flex items-center justify-center font-mono rounded-lg font-bold ${getBoxColor(i)}`}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm text-zinc-300">
            {narration(snap)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all font-mono disabled:opacity-30"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleStepBackward}
              className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all font-mono disabled:opacity-30"
            >
              Step Backward
            </button>
            <button
              onClick={handleStepForward}
              className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all font-mono disabled:opacity-30"
            >
              Step Forward
            </button>
            <span className="text-zinc-500 font-mono text-sm">
              {currentStep} / {steps.length - 1}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LinearSearchVisualizer;
