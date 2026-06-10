import { useNavigate } from "react-router-dom";
import { useState } from "react";

function StackVisualizer() {
  const navigate = useNavigate();
  const [stack, setStack] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState("Stack is ready");

  const handlePush = () => {
    if (inputVal === "") {
      return;
    }

    setStack((prev) => [...prev, inputVal]);
    setMessage(`Pushed ${inputVal}`);
    setInputVal("");
  };
  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty --- Nothing to pop.");
      return;
    }

    const popped = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setMessage(`Popped ${popped}`);
  };
  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty --- Nothing to peek.");
      return;
    }

    setMessage(`Top Element: ${stack[stack.length - 1]}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/visualizer")}
          className="border border-zinc-600 text-zinc-600 hover:border-white hover:text-white px-4 py-2 rounded-lg font-mono text-sm transition-all"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold font-serif">Stack</h1>
        <div className="w-24"></div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10 divide-x divide-zinc-800">
        {/*
        //*-------------------------------------------------
        //*Below is the code for the LEFT SIDE --- STACK
       */}

        <div className="flex flex-col items-center justify-center gap-4 min-h-64">
          <div className="border-2 border-dashed border-zinc-800 rounded-xl px-12 py-8 flex flex-col items-center gap-4 min-h-64">
            {[...stack].reverse().map((val, i) => (
              <div className="flex items-center gap-3" key={i}>
                <span
                  className={`text-xs font-mono flex items-center justify-center ${i === 0 ? "text-zinc-500" : "text-transparent"}`}
                >
                  TOP
                  {i === 0 && (
                    <img
                      src="/right-arrow.png"
                      className="w-2 h-2 invert opacity-60"
                    ></img>
                  )}
                </span>

                <div
                  className={`w-40 h-14 flex items-center justify-center font-mono font-bold rounded-lg border ${i === 0 ? "border-white bg-zinc-700 text-white" : "border-zinc-600 bg-zinc-900 text-zinc-400"}`}
                >
                  {val}
                </div>
              </div>
            ))}

            {stack.length === 0 && (
              <p className="text-zinc-600 font-mono text-sm">Stack is empty</p>
            )}

            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Size
                </p>
                <p className="text-2xl font-bold font-mono text-white">
                  {stack.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Status
                </p>
                <p
                  className={`text-2xl font-bold font-mono ${stack.length === 0 ? "text-red-400" : "text-green-400"}`}
                >
                  {stack.length === 0 ? "Empty" : "Active"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*
        //*--------------------------------------------------
        //*Below is the code for the RIGHT SIDE --- CONTROLS
       */}

        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full mb-2">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              About
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              A stack follows the last in first out (LIFO) rule: The last
              element pushed is the first element out. Think of a stack as a
              pile of plates, the top plate is always picked out first.
            </p>
          </div>

          <input
            type="text"
            placeholder="Enter value..."
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            className="w-full bg-zinc-900 border border-zinc-600 text-white font-mono px-4 py-2 rounded-lg focus:outline-none  focus:border-white"
          ></input>

          <div className="flex items-center gap-3">
            <button
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono disabled:opacity-30 flex items-center justify-center gap-2"
              onClick={handlePush}
            >
              Push
              <img src="/enter.png" className="w-5 h-5 invert opacity-60"></img>
            </button>

            <button
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono disabled:opacity-30 flex items-center justify-center gap-2"
              onClick={handlePop}
            >
              Pop
              <img
                src="/remove.png"
                className="w-5 h-5 invert opacity-60"
              ></img>
            </button>

            <button
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono disabled:opacity-30 flex items-center justify-center gap-2"
              onClick={handlePeek}
            >
              Peek
              <img
                src="/visibility.png"
                className="w-5 h-5 invert opacity-60"
              ></img>
            </button>
          </div>

          <div
            className={`px-3 py-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm min-w-64 text-center ${message.includes("empty") ? "text-red-400" : message.includes("Top") ? "text-yellow-400" : "text-green-400"}`}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackVisualizer;
