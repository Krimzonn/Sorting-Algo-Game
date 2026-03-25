import { Routes, Route } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import randArrGen from "./game-logic/arrayGenerator";
import { useEffect } from "react";
import quickSort from "./game-logic/quickSort";
import Guide from "./components/Guide";

function App() {
  // useEffect(() => {
  //   const arr = randArrGen(6);
  //   console.log("Original Array: ", arr);
  //   const steps = quickSort([...arr], 6);
  //   console.log("Steps: ", steps);
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/gameover" element={<GameOver />} />
      <Route path="/guide" element={<Guide />} />
    </Routes>
  );
}

export default App;
