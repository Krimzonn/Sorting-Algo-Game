import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LinkedListVisualizer() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState("Linked list is ready!");

  const handleInsertFront = () => {
    if (inputVal === "") {
      return;
    }

    setList((prev) => [{ id: Date.now(), value: inputVal }, ...prev]);
    setMessage(`Added ${inputVal} to the Front`);
    setInputVal("");
  };
  const handleInsertBack = () => {
    if (inputVal === "") {
      return;
    }

    setList((prev) => [...prev, { id: Date.now(), value: inputVal }]);
    setMessage(`Added ${inputVal} to the Back`);
    setInputVal("");
  };
  const handleDelete = () => {
    if (inputVal === "") {
      return;
    }

    const exists = list.some((node) => node.value === inputVal);
    if (!exists) {
      setMessage(`The value ${inputVal} does not exist`);
      return;
    }

    setList((prev) => prev.filter((node) => node.value !== inputVal));
    setMessage(`Deleted '${inputVal}' from the list `);
    setInputVal("");
  };
  const handleSearch = () => {};

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate("/visualizer")}
          className="border border-zinc-600 text-zinc-600 hover:border-white hover:text-white px-4 py-2 rounded-lg font-mono text-sm transition-all"
        >
          Back
        </button>
        <h2 className="text-4xl font-bold font-serif">Linked List</h2>
        <div className="w-24"></div>
      </div>

      {/* 
      //*-------------------------------------------------
      //*Below is the code for the Linked List visuals and Controls
      */}
      <div className="flex flex-col gap-10 mt-10">
        {/*
        //*-------------------------------------------------
        //*Below is the code for the TOP ROW --- Linked List
       */}

        <div className="flex border-2 border-dashed border-zinc-800 px-4 py-5 flex-row items-center justify-center gap-6 flex-wrap min-h-[120px]">
          {list.length === 0 && (
            <p className="text-sm font-mono text-zinc-600">List is empty</p>
          )}

          {list.map((node, i) => (
            <div key={node.id} className="flex items-center gap-2">
              {i === 0 && (
                <span className="text-xs font-mono text-zinc-500 mr-2">
                  HEAD
                  <img
                    src="/right-arrow.png"
                    className="w-5 h-5 invert opacity-60"
                  ></img>
                </span>
              )}

              <div className="flex rounded-lg border border-zinc-600 overflow-hidden">
                <div className="px-4 py-3 bg-zinc-900 font-bold font-mono text-white border-r border-zinc-600">
                  {node.value}
                </div>
                <div className="px-3 py-3 bg-zinc-800 text-zinc-400 font-mono text-sm">
                  <img
                    src="/right-arrow.png"
                    className="w-5 h-5 invert opacity-60"
                  ></img>
                </div>
              </div>

              {i < list.length - 1 && (
                <span className="text-zinc-600">
                  <img
                    src="/right-arrow.png"
                    className="w-5 h-5 invert opacity-60"
                  ></img>
                </span>
              )}

              {i === list.length - 1 && (
                <span className="text-zinc-600 font-mono text-sm ml-2">
                  <img
                    src="/right-arrow.png"
                    className="w-5 h-5 invert opacity-60"
                  ></img>
                  NULL
                </span>
              )}
            </div>
          ))}
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
              A linked list is a sequence of nodes where each node stores a
              value and a pointer to the next node. Unlike arrays nodes are not
              stored in contiguous (next to each other) memory rather they are
              linked through pointers. Insertion at the front is O(1) while
              searching is O(n).
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
              onClick={handleInsertFront}
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono flex items-center gap-2"
            >
              Insert Front
              <img src="/enter.png" className="w-5 h-5 invert opacity-60"></img>
            </button>
            <button
              onClick={handleInsertBack}
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono flex items-center gap-2"
            >
              Insert Back
              <img
                src="/enterback.png"
                className="w-5 h-5 invert opacity-60"
              ></img>
            </button>
            <button
              onClick={handleDelete}
              className="border border-zinc-500 text-zinc-400 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all font-mono flex items-center gap-2"
            >
              Delete
              <img
                src="/remove.png"
                className="w-5 h-5 invert opacity-60"
              ></img>
            </button>
          </div>

          <div
            className={`px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm text-center w-1/2 ${message.includes("Deleted") ? "text-red-400" : message.includes("Front") ? "text-yellow-500" : message.includes("Back") ? "text-blue-500" : message.includes("not exist") ? "text-red-500" : "text-green-500"}`}
          >
            {message}
          </div>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Size
              </p>
              <p className="text-2xl font-bold font-mono text-white">
                {list.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Status
              </p>
              <p
                className={`text-2xl font-bold font-mono ${list.length === 0 ? "text-red-400" : "text-green-400"}`}
              >
                {list.length === 0 ? "Empty" : "Active"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedListVisualizer;
