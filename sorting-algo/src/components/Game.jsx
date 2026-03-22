import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import NumberCard from "./NumberCard";
import { useState, useEffect, useCallback, useRef } from "react";
import randArrGen from "../game-logic/arrayGenerator";
import bubbleSort from "../game-logic/bubbleSort";
import insertionSort from "../game-logic/insertionSort";
import selectionSort from "../game-logic/selectionSort";
import PlayerBoard from "./PlayerBoard";
import moveValidator from "../game-logic/moveValidator";
import heapSort from "../game-logic/heapSort";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [invalidMove, setInvalidMove] = useState(false);

  const [botSteps, setBotSteps] = useState([]);
  const [botStepIndex, setBotStepIndex] = useState(0);

  const botIntervalRef = useRef(null);

  const handleSequenceCompletion = useCallback(() => {
    setPlayerScore((s) => s + 1);

    const { algorithm } = location.state;
    const algorithmMap = {
      bubbleSort: bubbleSort,
      insertionSort: insertionSort,
      selectionSort: selectionSort,
    };

    const arr = randArrGen(8);
    const sortFunc = algorithmMap[algorithm];
    const rawSteps = sortFunc([...arr], arr.length);

    let generatedSteps = rawSteps.filter((step, i) => {
      if (i === 0) {
        const curr = step.arr || step;
        return JSON.stringify(curr) !== JSON.stringify(arr);
      }
      const curr = step.arr || step;
      const prev = rawSteps[i - 1].arr || rawSteps[i - 1];
      return JSON.stringify(curr) !== JSON.stringify(prev);
    });

    setPlayerCards(arr);
    setBotCards([...arr]);
    setSteps(generatedSteps);
    setBotSteps(generatedSteps);
    setBotStepIndex(0);
    setCurrentStepIndex(0);
    setSelectedIndices([]);
    setCursorIndex(0);
  }, [location.state]);

  const handleBotSequenceComplete = useCallback(() => {
    setBotScore((s) => s + 1);

    const { algorithm } = location.state;
    const algorithmMap = {
      bubbleSort: bubbleSort,
      insertionSort: insertionSort,
      selectionSort: selectionSort,
    };

    const arr = randArrGen(8);
    const sortFunc = algorithmMap[algorithm];
    const rawSteps = sortFunc([...arr], arr.length);

    let generatedSteps = rawSteps.filter((step, i) => {
      if (i === 0) {
        const curr = step.arr || step;
        return JSON.stringify(curr) !== JSON.stringify(arr);
      }
      const curr = step.arr || step;
      const prev = rawSteps[i - 1].arr || rawSteps[i - 1];
      return JSON.stringify(curr) !== JSON.stringify(prev);
    });

    setBotCards(arr);
    setBotSteps(generatedSteps);
    setBotStepIndex(0);
  }, [location.state]);

  const handleSwap = useCallback(
    (indices) => {
      if (steps.length === 0 || !playerCards.length) return;

      const isValid = moveValidator(
        playerCards,
        indices,
        steps,
        currentStepIndex,
      );

      if (isValid) {
        const newCards = [...playerCards];
        const [i, j] = indices;
        let temp = newCards[i];
        newCards[i] = newCards[j];
        newCards[j] = temp;

        const nextStepIndex = currentStepIndex + 1;

        if (nextStepIndex === steps.length) {
          handleSequenceCompletion();
          return;
        }

        setPlayerCards(newCards);
        setCurrentStepIndex((csi) => csi + 1);
        setSelectedIndices([]);
      } else {
        setSelectedIndices([]);
        setInvalidMove(true);
        setTimeout(() => setInvalidMove(false), 400);
      }
    },
    [playerCards, steps, currentStepIndex, handleSequenceCompletion],
  );

  useEffect(() => {
    if (!location.state) {
      return;
    }

    const { algorithm, time } = location.state;
    setTimeLeft(time);

    const algorithmMap = {
      bubbleSort: bubbleSort,
      insertionSort: insertionSort,
      selectionSort: selectionSort,
    };

    const arr = randArrGen(8);
    const sortFunc = algorithmMap[algorithm];
    const rawSteps = sortFunc([...arr], arr.length);

    let generatedSteps = rawSteps.filter((step, i) => {
      if (i === 0) {
        const curr = step.arr || step;
        return JSON.stringify(curr) !== JSON.stringify(arr);
      }
      const curr = step.arr || step;
      const prev = rawSteps[i - 1].arr || rawSteps[i - 1];
      return JSON.stringify(curr) !== JSON.stringify(prev);
    });

    setPlayerCards(arr);
    setBotCards([...arr]);
    setSteps(generatedSteps);

    setBotSteps(generatedSteps);

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

      if (e.key === "ArrowUp" || e.key === "w") {
        if (selectedIndices.length === 0) {
          setSelectedIndices([cursorIndex]);
        } else if (selectedIndices.length === 1) {
          if (selectedIndices[0] === cursorIndex) {
            setSelectedIndices([]);
          } else {
            handleSwap([selectedIndices[0], cursorIndex]);
          }
        } else if (selectedIndices.length === 2) {
          setSelectedIndices([cursorIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    playerCards.length,
    cursorIndex,
    selectedIndices,
    steps,
    currentStepIndex,
    handleSwap,
  ]);

  useEffect(() => {
    if (timeLeft <= 0) {
      const { algorithm, difficulty, mode } = location.state;

      navigate("/gameover", {
        state: {
          playerScore,
          botScore,
          algorithm,
          difficulty,
          mode,
        },
      });

      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((tL) => {
        if (tL < 1) {
          clearInterval(interval);
          return;
        } else {
          return tL - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    const { difficulty } = location.state;

    if (botSteps.length === 0) {
      return;
    }

    const botSpeed =
      difficulty === "easy" ? 4000 : difficulty === "medium" ? 2500 : 1000;

    botIntervalRef.current = setInterval(() => {
      setBotStepIndex((bsi) => {
        if (bsi >= botSteps.length) {
          handleBotSequenceComplete();
          clearInterval(botIntervalRef.current);
          return bsi;
        }

        const stepData = botSteps[bsi];
        setBotCards(botSteps[bsi]);
        return bsi + 1;
      });
    }, botSpeed);

    return () => clearInterval(botIntervalRef.current);
  }, [botSteps, handleBotSequenceComplete]);

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

  const { algorithm, difficulty, mode, time } = location.state;

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
            selectedIndices={selectedIndices}
            invalidMove={invalidMove}
          />
          <PlayerBoard
            playerName={"Bot"}
            cards={botCards}
            cursorIndex={-1}
            selectedIndices={[]}
            invalidMove={false}
          />
        </div>
      </div>
    </>
  );
}

export default Game;
