import { IMAGE_TYPES } from "./constants";
import FilePreview from "./FilePreview";
import StatusIcon from "./StatusIcon";
import { formatBytes, getExt } from "./utils";

export default function FileList({ files, statuses, imageUrlsByKey, totalBytes }) {
  const completed = Object.values(statuses).filter((s) => s === "completed").length;
  const errors = Object.values(statuses).filter((s) => s === "error").length;

  return (
    <>
      <div style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
        Toplam: {files.length} dosya ({formatBytes(totalBytes)}) | OK {completed} | ERR {errors}
      </div>
      <div className="file-list">
        {files.map((file, idx) => {
          const status = statuses[idx] || "waiting";
          const ext = getExt(file?.name);
          const key = `${idx}:${file?.name}:${file?.size}:${file?.lastModified}`;
          const url = IMAGE_TYPES.includes(ext) ? imageUrlsByKey[key] : null;

          return (
            <div
              key={key}
              className={`file-item-with-preview ${status === "error" ? "file-item-error" : ""}`}
            >
              <FilePreview file={file} url={url} size="sm" />
              <div>
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatBytes(file.size)}</div>
              </div>
              <StatusIcon status={status} />
            </div>
          );
        })}
      </div>
    </>
  );
}

