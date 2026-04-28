export default function Controls({ isUploading, isPaused, onReset, onTogglePause }) {
  return (
    <div className="flex gap-3 justify-center">
      <button
        type="button"
        onClick={onReset}
        className="bg-gray-600 px-4 py-2 rounded-xl hover:bg-gray-700 transition w-full"
      >
        Sıfırla
      </button>
      <button
        type="button"
        onClick={onTogglePause}
        className={`bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full ${isUploading ? "" : "hidden"}`}
      >
        {isPaused ? "Devam Et" : "Durdur"}
      </button>
    </div>
  );
}

