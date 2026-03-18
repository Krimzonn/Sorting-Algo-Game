function TopBar({ algorithm, timeLeft, playerscore, botscore }) {
  return (
    <>
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-700 rounded-2xl px-8 py-4 w-full">
        <p className="text-fuchsia-500 font-bold text-lg ">{algorithm}</p>
        <p className="text-white font-bold text-3xl">{timeLeft}</p>
        <div className="flex flex-row gap-8 items-center">
          <div className="bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-2">
            <p className="text-cyan-400 font-bold">You: {playerscore}</p>
          </div>
          <div className="bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-2">
            <p className="text-orange-400 font-bold">Bot: {botscore}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
