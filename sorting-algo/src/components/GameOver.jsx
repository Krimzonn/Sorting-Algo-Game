import { useLocation } from "react-router-dom";
import MatrixBackground from "./MatrixBackground";

function GameOver() {
  const location = useLocation();
  const { playerScore, botScore, algorithm, difficulty, mode } = location.state;

  console.log(playerScore, botScore);

  const winner =
    playerScore > botScore
      ? "You Win!"
      : playerScore < botScore
        ? "Bot Wins!"
        : "It's a draw";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-zinc-900 bg-opacity-20 border-2 border-fuchsia-500 rounded-2xl p-12 w-2/5 flex flex-col justify-center items-center gap-8">
        <MatrixBackground />

        <div className=""></div>

        <h1 className="text-4xl font-bold text-white mb-2">{winner}</h1>

        <div className="flex flex-row gap-8 w-full justify-center">
          <div className="bg-zinc-800 border border-zinc-600 rounded-xl px-8 py-4 text-center">
            <p className="text-sm text-zinc-400 mb-1">YOU</p>
            <p className="text-4xl font-bold text-cyan-400">{playerScore}</p>
          </div>
          <div className="bg-zinc-800 border border-zinc-600 rounded-xl px-8 py-4 text-center">
            <p className="text-sm text-zinc-400 mb-1">BOT</p>
            <p className="text-4xl font-bold text-orange-400">{botScore}</p>
          </div>
        </div>

        <p className="text-sm bg-zinc-800 border border-fuchsia-500 text-fuchsia-400 px-6 py-2 rounded-full font-bold">
          {algorithm}
        </p>
      </div>
    </div>
  );
}
export default GameOver;
