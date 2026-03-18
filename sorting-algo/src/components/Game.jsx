import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import NumberCard from "./NumberCard";
import { useState, useEffect } from "react";
import randArrGen from "../game-logic/arrayGenerator";
import bubbleSort from "../game-logic/bubbleSort";
import insertionSort from "../game-logic/insertionSort";
import selectionSort from "../game-logic/selectionSort";
import PlayerBoard from "./PlayerBoard";

function Game() {
  const location = useLocation();

  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);

  const [selectedIndices, setSelectedIndices] = useState([]);
  const [cursorIndex, setCursorIndex] = useState(0);

  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(90);
  const [sequenceTimer, setSequenceTimer] = useState(0);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (!location.state) {
      return;
    }

    const { algorithm } = location.state;

    const algorithmMap = {
      bubbleSort: bubbleSort,
      insertionSort: insertionSort,
      selectionSort: selectionSort,
    };

    const arr = randArrGen(6);
    const sortFunc = algorithmMap[algorithm];
    const generatedSteps = sortFunc([...arr], 6);

    setPlayerCards(arr);
    setBotCards([...arr]);
    setSteps(generatedSteps);

    console.log("Array: ", arr);
    console.log("Steps: ", generatedSteps);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        setCursorIndex((cI) => Math.max(0, cI - 1));
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        setCursorIndex((cI) => Math.min(playerCards.length - 1, cI + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerCards.length]);

  if (!location.state) {
    return (
      <div className="text-white p-10">
        No game data found{" "}
        <a className="text-fuchsia-500" href="/">
          go back to main menu
        </a>
      </div>
    );
  }

  const { algorithm, difficulty, mode } = location.state;

  return (
    <>
      <div className="min-h-screen bg-zinc-950 p-8 flex flex-col gap-6">
        <TopBar
          algorithm={algorithm}
          timeLeft={timeLeft}
          playerscore={playerScore}
          botscore={botScore}
        />
        <div className="flex flex-col gap-6 p-8 bg-zinc-950 min-h-screen">
          <PlayerBoard
            playerName={"You"}
            cards={playerCards}
            cursorIndex={cursorIndex}
          />
          <PlayerBoard playerName={"Bot"} cards={botCards} cursorIndex={-1} />
        </div>
      </div>
    </>
  );
}

export default Game;
