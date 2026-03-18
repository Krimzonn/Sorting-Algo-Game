function NumberCard({ value, isSelected, isCursor }) {
  const cardStyle = isSelected
    ? "bg-green-400"
    : isCursor
      ? "bg-fuchsia-300"
      : "bg-white";

  const textStyle = isSelected ? "text-white" : "text-zinc-950";

  return (
    <div
      className={`rounded-xl w-18 h-20 flex flex-col cursor-pointer transition-all duration-200 overflow-hidden ${cardStyle}`}
    >
      <div className="bg-purple-600 w-full h-4"></div>
      <div className="flex flex-1 items-center justify-center ">
        <p className={`font-bold text-3xl ${textStyle}`}>{value}</p>
      </div>
    </div>
  );
}

export default NumberCard;
