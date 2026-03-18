function NumberCard({ value, isSelected, isCursor }) {
  const cardStyle = isSelected
    ? "bg-green-400 scale-110 shadow-lg shadow-green-400"
    : isCursor
      ? "bg-white scale-105 shadow-lg shadow-fuchsia-500"
      : "bg-white";

  return (
    <div
      className={`bg-white rounded-xl w-18 h-20 flex flex-col cursor-pointer transition-all duration-200 overflow-hidden ${cardStyle}`}
    >
      <div className="bg-purple-600 w-full h-4"></div>
      <div className="flex flex-1 items-center justify-center ">
        <p className="font-bold text-3xl text-zinc-950">{value}</p>
      </div>
    </div>
  );
}

export default NumberCard;
