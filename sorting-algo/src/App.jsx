import { Routes, Route } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

function App() {
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
