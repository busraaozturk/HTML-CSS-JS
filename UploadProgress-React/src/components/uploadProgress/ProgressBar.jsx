export default function ProgressBar({ percent, glow }) {
  return (
    <div className="w-full bg-gray-700/50 rounded-full h-5 overflow-hidden mb-4">
      <div
        className={[
          "h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500",
          glow ? "glow" : "",
        ].join(" ")}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

