import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ParticleBackground from "./ParticleBackground";
import SlideTransition from "./SlideTransition";

function MainMenu() {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("main");
  const [selectAlgorithm, setSelectAlgorithm] = useState(null);
  const [selectDifficulty, setSelectDifficulty] = useState(null);
  const [gameMode, setGameMode] = useState("ai");
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pendingScreenRef = useRef(null);

  const transitionTo = (newScreen) => {
    pendingScreenRef.current = newScreen;
    setIsTransitioning(true);

    setTimeout(() => {
      setScreen(newScreen);
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    if (screen === "difficulty") {
      document.body.style.background = "#0a0a0a";
      document.body.style.backgroundImage =
        "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)";
      document.body.style.backgroundSize = "40px 40px";
    } else {
      document.body.style.background = "#09090b";
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundSize = "auto";
    }
  }, [screen]);

  let content;

  if (screen === "main") {
    content = (
      <div className="h-screen flex flex-col items-center justify-center">
        <ParticleBackground />
        <h1 className="text-5xl font-bold text-fuchsia-500 mb-10">
          Sorting Algo
        </h1>

        <div className="flex flex-col gap-4">
          <button
            className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55"
            type="button"
            onClick={() => transitionTo("algorithm")}
          >
            PLAY
          </button>
          <button
            className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55"
            onClick={() => navigate("/visualizer")}
          >
            VISUALIZER
          </button>
          <button
            className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55"
            type="button"
            onClick={() => navigate("/leaderboard")}
          >
            LEADERBOARD
          </button>
          <button
            className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55"
            onClick={() => navigate("/guide")}
          >
            GUIDE
          </button>
          <button
            className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55"
            type="button"
            onClick={() => transitionTo("settings")}
          >
            SETTINGS
          </button>
        </div>
      </div>
    );
  } else if (screen === "algorithm") {
    content = (
      <div className="h-screen flex flex-col items-center justify-center">
        <ParticleBackground />
        <h1 className="text-4xl font-bold text-fuchsia-500 mb-10">
          Select An Algorithm
        </h1>

        <div className="flex flex-row gap-6 mt-10">
          <div
            className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating"
            style={{ animationDelay: "0s" }}
          >
            <p className="text-xs font-mono mt-3 px-2 py-1 rounded-full bg-cyan-900 text-cyan-300 border border-cyan-500">
              O(n²)
            </p>
            <p className="font-bold">Bubble Sort</p>
            <p className="text-xs text-zinc-400 mt-2">Compare Neighbors</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                transitionTo("difficulty");
                setSelectAlgorithm("bubbleSort");
              }}
            >
              SELECT
            </button>
          </div>

          <div
            className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xs font-mono mt-3 px-2 py-1 rounded-full bg-cyan-900 text-cyan-300 border border-cyan-500">
              O(n²)
            </p>
            <p className="font-bold">Selection Sort</p>
            <p className="text-xs text-zinc-400 mt-2">Find The Minimum</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                transitionTo("difficulty");
                setSelectAlgorithm("selectionSort");
              }}
            >
              SELECT
            </button>
          </div>

          <div
            className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating"
            style={{ animationDelay: "1s" }}
          >
            <p className="text-xs font-mono mt-3 px-2 py-1 rounded-full bg-cyan-900 text-cyan-300 border border-cyan-500">
              O(n²)
            </p>
            <p className="font-bold">Insertion Sort</p>
            <p className="text-xs text-zinc-400 mt-2">Build Sorted Left</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                transitionTo("difficulty");
                setSelectAlgorithm("insertionSort");
              }}
            >
              SELECT
            </button>
          </div>

          <div
            className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating"
            style={{ animationDelay: "1.5s" }}
          >
            <p className="text-xs font-mono mt-3 px-2 py-1 rounded-full bg-fuchsia-900 text-fuchsia-300 border border-fuchsia-500">
              O(n log n)
            </p>
            <p className="font-bold">Quick Sort</p>
            <p className="text-xs text-zinc-400 mt-2">Pivot And Partition</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                transitionTo("difficulty");
                setSelectAlgorithm("quickSort");
              }}
            >
              SELECT
            </button>
          </div>

          <div
            className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating"
            style={{ animationDelay: "2s" }}
          >
            <p className="text-xs font-mono mt-3 px-2 py-1 rounded-full bg-fuchsia-900 text-fuchsia-300 border border-fuchsia-500">
              O(n log n)
            </p>
            <p className="font-bold">Heap Sort</p>
            <p className="text-xs text-zinc-400 mt-2">Build, Swap, Repeat</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                transitionTo("difficulty");
                setSelectAlgorithm("heapSort");
              }}
            >
              SELECT
            </button>
          </div>
        </div>

        <button
          className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-4 rounded-xl mt-12 transition-colors duration-300"
          onClick={() => transitionTo("main")}
        >
          BACK
        </button>
      </div>
    );
  } else if (screen === "difficulty") {
    const recommendedTimes = {
      bubbleSort: 75,
      selectionSort: 75,
      insertionSort: 75,
      heapSort: 160,
      quickSort: 100,
    };

    const recommended = recommendedTimes[selectAlgorithm];
    content = (
      <div className=" h-screen flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold text-fuchsia-500 mb-10">
          Choose A Difficulty
        </h1>
        <div className="flex flex-row gap-8 mt-10">
          <div className="bg-zinc-800 border border-green-400 rounded-xl p-7 w-40 text-center text-white floating glowGreenEffect">
            <p className="font-bold">🟢 EASY</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                setSelectDifficulty("easy");
                setShowTimeModal(true);
              }}
            >
              SELECT
            </button>
          </div>

          <div className="bg-zinc-800 border border-yellow-400 rounded-xl p-7 w-40 text-center text-white floating glowYellowEffect">
            <p className="font-bold">⚡MEDIUM</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                setSelectDifficulty("medium");
                setShowTimeModal(true);
              }}
            >
              SELECT
            </button>
          </div>

          <div className="bg-zinc-800 border border-red-400 rounded-xl p-7 w-40 text-center text-white floating glowRedEffect">
            <p className="font-bold">💀 HARD</p>
            <button
              className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10"
              type="button"
              onClick={() => {
                setSelectDifficulty("hard");
                setShowTimeModal(true);
              }}
            >
              SELECT
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-8 mt-10">
          <button
            className="bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl"
            onClick={() => setGameMode("ai")}
          >
            AI MODE
          </button>
          <button
            className="bg-orange-400 text-black font-bold px-8 py-3 rounded-xl"
            onClick={() => setGameMode("pvp")}
          >
            PvP MODE
          </button>
        </div>
        <button
          className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-4 rounded-xl mt-12 transition-colors duration-300"
          type="button"
          onClick={() => transitionTo("algorithm")}
        >
          BACK
        </button>
        {showTimeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border-2 border-fuchsia-500 rounded-2xl p-10 flex flex-col items-center gap-6">
              <h2 className="text-2xl font-bold text-fuchsia-500">
                Set Your Time
              </h2>
              <div className="flex flex-row gap-5">
                <div
                  className="bg-zinc-800 border-2 border-purple-500 hover:border-fuchsia-500 hover:bg-zinc-700 rounded-xl p-6 w-32 text-center cursor-pointer transition-all duration-200 floating"
                  onClick={() =>
                    navigate("/game", {
                      state: {
                        algorithm: selectAlgorithm,
                        difficulty: selectDifficulty,
                        mode: gameMode,
                        time: 40,
                      },
                    })
                  }
                >
                  <p className="text-4xl mb-2">⏱️</p>
                  <p className="text-2xl font-bold text-fuchsia-400">40s</p>
                  <p className="text-xs text-zinc-400 mt-1">Quick</p>
                  {recommended === 40 && (
                    <p className="text-xs text-green-400 font-bold mt-1">⭐</p>
                  )}
                </div>

                <div
                  className="bg-zinc-800 border-2 border-purple-500 hover:border-fuchsia-500 hover:bg-zinc-700 rounded-xl p-6 w-32 text-center cursor-pointer transition-all duration-200 floating"
                  onClick={() =>
                    navigate("/game", {
                      state: {
                        algorithm: selectAlgorithm,
                        difficulty: selectDifficulty,
                        mode: gameMode,
                        time: 75,
                      },
                    })
                  }
                >
                  <p className="text-4xl mb-2">⏱️</p>
                  <p className="text-2xl font-bold text-fuchsia-400">75s</p>
                  <p className="text-xs text-zinc-400 mt-1">Standard</p>
                  {recommended === 75 && (
                    <p className="text-xs text-green-400 font-bold mt-1">⭐</p>
                  )}
                </div>

                <div
                  className="bg-zinc-800 border-2 border-purple-500 hover:border-fuchsia-500 hover:bg-zinc-700 rounded-xl p-6 w-32 text-center cursor-pointer transition-all duration-200 floating"
                  onClick={() =>
                    navigate("/game", {
                      state: {
                        algorithm: selectAlgorithm,
                        difficulty: selectDifficulty,
                        mode: gameMode,
                        time: 100,
                      },
                    })
                  }
                >
                  <p className="text-4xl mb-2">⏱️</p>
                  <p className="text-2xl font-bold text-fuchsia-400">100s</p>
                  <p className="text-xs text-zinc-400 mt-1">Extended</p>
                  {recommended === 100 && (
                    <p className="text-xs text-green-400 font-bold mt-1">⭐</p>
                  )}
                </div>

                <div
                  className="bg-zinc-800 border-2 border-purple-500 hover:border-fuchsia-500 hover:bg-zinc-700 rounded-xl p-6 w-32 text-center cursor-pointer transition-all duration-200 floating"
                  onClick={() =>
                    navigate("/game", {
                      state: {
                        algorithm: selectAlgorithm,
                        difficulty: selectDifficulty,
                        mode: gameMode,
                        time: 130,
                      },
                    })
                  }
                >
                  <p className="text-4xl mb-2">⏱️</p>
                  <p className="text-2xl font-bold text-fuchsia-400">130s</p>
                  <p className="text-xs text-zinc-400 mt-1">Marathon</p>
                  {recommended === 130 && (
                    <p className="text-xs text-green-400 font-bold mt-1">⭐</p>
                  )}
                </div>

                <div
                  className="bg-zinc-800 border-2 border-purple-500 hover:border-fuchsia-500 hover:bg-zinc-700 rounded-xl p-6 w-32 text-center cursor-pointer transition-all duration-200 floating"
                  onClick={() =>
                    navigate("/game", {
                      state: {
                        algorithm: selectAlgorithm,
                        difficulty: selectDifficulty,
                        mode: gameMode,
                        time: 160,
                      },
                    })
                  }
                >
                  <p className="text-4xl mb-2">⏱️</p>
                  <p className="text-2xl font-bold text-fuchsia-400">160s</p>
                  <p className="text-xs text-zinc-400 mt-1">Ultimate</p>
                  {recommended === 160 && (
                    <p className="text-xs text-green-400 font-bold mt-1">⭐</p>
                  )}
                </div>
              </div>

              <button
                className="border-2 border-zinc-500 text-zinc-400 hover:border-fuchsia-500 hover:text-fuchsia-500 font-bold px-6 py-2 rounded-xl transition-colors duration-300 mt-2"
                onClick={() => setShowTimeModal(false)}
              >
                BACK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <SlideTransition triggerKey={isTransitioning}>{content}</SlideTransition>
    </>
  );
}

export default MainMenu;
