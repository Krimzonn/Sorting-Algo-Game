import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import NumberCard from "./NumberCard";
import { useState, useEffect } from "react";
import randArrGen from "../game-logic/arrayGenerator";
import bubbleSort from "../game-logic/bubbleSort";
import insertionSort from "../game-logic/insertionSort";
import selectionSort from "../game-logic/selectionSort";

function Game()
{

  const location = useLocation();

  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);

  const [selectedIndices, setSelectedIndices] = useState([]);

  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(90);
  const [sequenceTimer, setSequenceTimer] = useState(0);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);

    if (!location.state)
  {
    return <div className="text-white p-10">No game data found <a className="text-fuchsia-500" href="/">go back to main menu</a></div>
  }

  const {algorithm, difficulty, mode} = location.state;
  
  useEffect(() => {
    const algorithmMap = {
      bubbleSort: bubbleSort,
      insertionSort: insertionSort,
      selectionSort: selectionSort
  }

    const arr = randArrGen(6);
    const sortFunc = algorithmMap[algorithm];
    const generatedSteps = sortFunc([...arr], 6);

    setPlayerCards(arr);
    setBotCards([...arr]);
    setSteps(generatedSteps);

    console.log("Array: ", arr);
    console.log("Steps: ", generatedSteps);
  }, []);



  return(
    <>

    </>
  )
}

export default Game;