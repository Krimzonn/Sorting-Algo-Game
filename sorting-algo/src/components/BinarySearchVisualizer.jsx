import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import binarySearchVisualizerGen from "../game-logic/binarySearchVisualizerGen";
import randArrGen from "../game-logic/arrayGenerator";

function BinarySearchVisualizer() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(null);
  const [targetInput, setTargetInput] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);

  const handleSearchStart = () => {
    if (targetInput === "") {
      return;
    }

    const arr = randArrGen(8);
    const sortedArr = [...arr].sort((a, b) => a - b);
    setArray(sortedArr);
    setSteps(binarySearchVisualizerGen(sortedArr, Number(targetInput)));
    setCurrentStep(0);
    setSearchStarted(true);
  };

  const narration = (snap) => {
    if (snap.found) {
      return `Found ${snap.target} at index ${snap.mid}`;
    }
    if (snap.mid === -1) {
      return `${snap.target} was not found in the array`;
    }
    if (snap.array[snap.mid] < snap.target) {
      return `${snap.array[snap.mid]} is less than ${snap.target} - searching right half`;
    }
    return `${snap.array[snap.mid]} is greater than ${snap.target} - searching left half`;
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
    if (snap.found && i === snap.mid) {
      return "bg-green-400 text-black";
    }
    if (i === snap.mid) {
      return "bg-yellow-400 text-black";
    }
    if (i < snap.low || i > snap.high) {
      return "bg-zinc-800 text-zinc-600";
    }

    return "bg-zinc-900 text-white border border-zinc-600";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/visualizer")}
          className="border border-zinc-600 text-zinc-600 hover:border-white hover:text-white px-4 py-2 rounded-lg font-mono text-sm transition-all"
        >
          Back
        </button>
        <h2 className="text-4xl font-bold font-serif">Binary Search</h2>
        <button className="bg-white text-black px-5 py-4 rounded-md text-lg font-mono hover:bg-zinc-500 hover:text-white hover:opacity-80 transition-all duration-300 cursor-pointer">
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
                  {i === snap.low &&
                    i === snap.high &&
                    i === snap.mid &&
                    "L/M/R"}
                  {i === snap.low && i !== snap.mid && "L"}
                  {i === snap.mid && "MID"}
                  {i === snap.high && i !== snap.mid && "H"}
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

export default BinarySearchVisualizer;
