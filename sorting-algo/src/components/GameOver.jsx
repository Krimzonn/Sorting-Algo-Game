import { useLocation, useNavigate } from "react-router-dom";
import MatrixBackground from "./MatrixBackground";

function GameOver() {
  const location = useLocation();
  const { playerScore, botScore, algorithm, difficulty, mode } = location.state;

  console.log(playerScore, botScore);

  const navigate = useNavigate();

  const winner =
    playerScore > botScore
      ? "You Win!"
      : playerScore < botScore
        ? "Bot Wins!"
        : "It's a draw";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <MatrixBackground />
      <div className="bg-zinc-900/70 border-2 border-fuchsia-500 rounded-2xl p-12 w-2/5 flex flex-col justify-center items-center gap-8">
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

        <div className="flex flex-col gap-3 w-full mt-5">
          <button
            className="bg-fuchsia-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-xl transition-colors duration-300 w-full"
            onClick={() => navigate("/game", { state: location.state })}
          >
            PLAY AGAIN
          </button>
          <button
            className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-8 py-3 rounded-xl transition-colors duration-300 w-full"
            onClick={() => navigate("/")}
          >
            MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
}
export default GameOver;
