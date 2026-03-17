import TopBar from "./TopBar";
import NumberCard from "./NumberCard";

function Game()
{
  return(
    <>
    <div className="flex gap-4 p-10 bg-zinc-950 min-h-screen">
      <NumberCard value={3} isSelected={false} />
      <NumberCard value={7} isSelected={false} />
      <NumberCard value={1} isSelected={false} />
    </div>
    </>
  )
}

export default Game;