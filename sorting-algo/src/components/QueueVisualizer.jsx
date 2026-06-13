import { useNavigate } from "react-router-dom";
import { useState } from "react";

const codeSnippets = {
  queue: {
    description:
      "A Queue follows First In First Out (FIFO): elements are added at the back (enqueue) and removed from the front (dequeue). Using an array, enqueue is O(1) since it adds to the end, while dequeue is O(n) because every remaining element must shift left by one position.",
    cpp: `#include<vector>
using namespace std;

vector<int> queue;

void enqueue(int value)
{
  queue.push_back(value);
}

int dequeue()
{
  int front = queue.front();
  queue.erase(queue.begin());
  return front;
}

int peek()
{
  return queue.front();
}`,
    js: `let queue = [];

function enqueue(value)
{
  queue.push(value);
}

function dequeue()
{
  if (queue.length === 0) return null;
  return queue.shift();
}

function peek()
{
  if (queue.length === 0) return null;
  return queue[0];
}`,
  },
};

function QueueVisualizer() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState("Queue Is Ready!");
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState("cpp");
  const [inputVal, setInputVal] = useState("");

  function handleEnqueue() {
    if (inputVal === "") {
      return;
    }

    setQueue((prev) => [...prev, inputVal]);
    setMessage(`Enqueued ${inputVal} to the Queue`);
    setInputVal("");
  }

  function handleDequeue() {
    if (queue.length === 0) {
      setMessage("Queue is Empty!");
      return;
    }

    const dequeuedVal = queue[0];
    setQueue((prev) => prev.slice(1));
    setMessage(`Dequeued ${dequeuedVal} from the Queue`);
  }

  function handlePeek() {
    if (queue.length === 0) {
      setMessage("Queue is Empty!");
      return;
    }

    setMessage(`The front element is: ${queue[0]} `);
  }

  return (
    <div className="min-h-screen bg-black text-white p-12 pt-5">
      {showCode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-2/5 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">Queue - Code</h2>
              <button
                className="text-zinc-400 hover:text-white font-mono"
                onClick={() => setShowCode(false)}
              >
                Close ✕
              </button>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {codeSnippets.queue.description}
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
                ? codeSnippets.queue?.cpp
                : codeSnippets.queue?.js}
            </pre>
          </div>
        </div>
      )}
      {/*
      //*-------------------------------------------------
      //*Header
      */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/visualizer")}
          className="border border-zinc-600 text-zinc-600 hover:border-white hover:text-white px-4 py-2 rounded-lg font-mono text-sm transition-all"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold font-serif">Queue</h1>
        <button
          onClick={() => setShowCode(true)}
          className="bg-white text-black px-5 py-4 rounded-md text-lg font-mono hover:bg-zinc-500 hover:text-white hover:opacity-80 transition-all duration-300 cursor-pointer"
        >
          Show Code
        </button>
      </div>

      {/* 
      //*-------------------------------------------------
      //*Below is the code for the Queue visuals and Controls
      */}

      <div className="flex flex-col gap-10 mt-10">
        {/*
        //*-------------------------------------------------
        //*Below is the code for the TOP ROW --- QUEUE
       */}

        <div className="flex flex-row items-center justify-center gap-6">
          <div className="border-2 border-dashed border-zinc-800 rounded-xl px-12 py-8 flex flex-row items-center gap-4 min-h-4 flex-wrap">
            <div className="flex flex-row items-center gap-4">
              {queue.length > 0 && (
                <span className="text-xs font-mono text-zinc-500">
                  FRONT
                  <img
                    src="/right-arrow.png"
                    className="w-3 h-3 invert opacity-60"
                  ></img>
                </span>
              )}
              {[...queue].map((val, i) => (
                <div
                  key={i}
                  className={`w-14 h-14 flex items-center justify-center font-mono font-bold rounded-lg border ${i === 0 ? "border-white bg-green-400 text-black" : "border-zinc-600 bg-zinc-600 text-zinc-400"}`}
                >
                  {val}
                </div>
              ))}
              {queue.length > 0 && (
                <span className="text-xs font-mono text-zinc-500">
                  <img
                    src="/right-arrow.png"
                    className="w-3 h-3 invert opacity-60"
                  ></img>
                  BACK
                </span>
              )}
              {queue.length === 0 && (
                <p className="text-zinc-600 font-mono text-sm">
                  Queue is empty
                </p>
              )}
            </div>
          </div>
        </div>

        {/*
        //*-------------------------------------------------
        //*Below is the code for the BOTTOM ROW --- CONTROLS
       */}

        <div className="flex flex-col items-center gap-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-2/3">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              About
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              A Queue follows First In First Out (FIFO): the first element
              enqueued is the first to be dequeued. Think of it as a line of
              people waiting, the person at the front is served first.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter value..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="bg-zinc-900 border border-zinc-600 text-white font-mono px-4 py-2 rounded-lg focus:outline-none focus:border-white"
            ></input>
            <button
              onClick={handleEnqueue}
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono flex items-center gap-2"
            >
              Enqueue
              <img src="/enter.png" className="w-5 h-5 invert opacity-60"></img>
            </button>
            <button
              onClick={handleDequeue}
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono flex items-center gap-2"
            >
              Dequeue
              <img
                src="/remove.png"
                className="w-5 h-5 invert opacity-60"
              ></img>
            </button>

            <button
              onClick={handlePeek}
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono flex items-center gap-2"
            >
              Peek
              <img
                src="/visibility.png"
                className="w-5 h-5 invert opacity-60"
              ></img>
            </button>
          </div>
          <div
            className={`px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm text-center w-1/2 ${message.includes("Empty") ? "text-red-400" : message.includes("front") ? "text-yellow-500" : "text-green-400"}`}
          >
            {message}
          </div>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Size
              </p>
              <p className="text-2xl font-bold font-mono text-white">
                {queue.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Status
              </p>
              <p
                className={`text-2xl font-bold font-mono ${queue.length === 0 ? "text-red-400" : "text-green-400"}`}
              >
                {queue.length === 0 ? "Empty" : "Active"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueueVisualizer;
