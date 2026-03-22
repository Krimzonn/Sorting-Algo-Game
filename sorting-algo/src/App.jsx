import { Routes, Route } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import heapSort from "./game-logic/heapSort";
import randArrGen from "./game-logic/arrayGenerator";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const arr = randArrGen(6);
    console.log("Original Array: ", arr);
    const steps = heapSort([...arr], 6);
    console.log("Steps: ", steps);
    console.log("Last Step: ", steps[steps.length - 1]);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/gameover" element={<GameOver />} />
    </Routes>
  );
}

export default App;
