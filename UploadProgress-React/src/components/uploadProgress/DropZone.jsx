export default function DropZone({
  disabled,
  isDragOver,
  onPickFilesClick,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPickFilesClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPickFilesClick();
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={[
        "border-2 border-dashed rounded-2xl p-6 mb-4 transition cursor-pointer",
        isDragOver ? "border-blue-400" : "border-gray-500",
        disabled ? "opacity-60 pointer-events-none" : "hover:border-blue-400",
      ].join(" ")}
    >
      <p className="text-sm text-gray-300">Dosyalari buraya surukle veya tikla</p>
    </div>
  );
}

