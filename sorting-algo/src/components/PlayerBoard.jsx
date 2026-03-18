import NumberCard from "./NumberCard";

function PlayerBoard({ playerName, cards, cursorIndex, selectedIndices }) {
  return (
    <div className="bg-zinc-950 border border-zinc-700 rounded-2xl p-6 w-full">
      <div className="flex justify-between  items-center mb-6">
        <p className="text-xl font-bold text-fuchsia-500">{playerName}</p>
      </div>

      <div className="flex flex-row gap-3 justify-center">
        {cards.map((card, i) => (
          <NumberCard
            key={i}
            value={card}
            isSelected={selectedIndices.includes(i)}
            isCursor={i == cursorIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerBoard;
