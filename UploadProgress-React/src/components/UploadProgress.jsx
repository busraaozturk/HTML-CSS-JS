import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

import "../upload-progress.css";

const IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
const DOC_TYPES = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf"];
const AUDIO_TYPES = ["mp3", "wav", "ogg", "m4a", "flac", "aac"];
const VIDEO_TYPES = ["mp4", "avi", "mov", "mkv", "wmv"];

// Tuning: slow down simulation so the user has time to press "Durdur".
const UPLOAD_SPEED_MBPS = 2; // was 10MB/s in vanilla
const MIN_FILE_DURATION_MS = 2000; // tiny files still take at least this long

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${sizes[index]}`;
}

function getExt(fileName) {
  const parts = String(fileName || "").split(".");
  return (parts[parts.length - 1] || "").toLowerCase();
}

function getDocIcon(ext) {
  const iconMap = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    xls: "📊",
    xlsx: "📊",
    ppt: "📈",
    pptx: "📈",
    txt: "📃",
    rtf: "📄",
  };
  return iconMap[ext] || "📁";
}

// Vanilla version: ~10MB/s, tick 100ms, per-file 10% failure chance at random point (20%-80%).
function createUploadTicker(file, { isUploadingRef, isPausedRef, onTick }) {
  let current = 0;
  const total = Math.max(file?.size || 0, 1);

  const uploadSpeedBps = UPLOAD_SPEED_MBPS * 1024 * 1024;
  const computedDurationMs = (total / uploadSpeedBps) * 1000;
  const targetDurationMs = Math.max(computedDurationMs, MIN_FILE_DURATION_MS);

  const tickMs = 100;
  const steps = Math.max(Math.ceil(targetDurationMs / tickMs), 1);
  const chunkSize = Math.max(Math.ceil(total / steps), 1);

  const shouldFail = Math.random() < 0.1;
  const failAt = shouldFail
    ? Math.max(Math.floor(total * (0.2 + Math.random() * 0.6)), 1)
    : -1;

  const intervalId = setInterval(() => {
    if (!isUploadingRef.current) {
      clearInterval(intervalId);
      return;
    }
    if (isPausedRef.current) return;

    current = Math.min(current + chunkSize, total);

    if (shouldFail && current >= failAt) {
      clearInterval(intervalId);
      onTick({ kind: "error" });
      return;
    }

    onTick({ kind: "progress", current, total });

    if (current >= total) clearInterval(intervalId);
  }, tickMs);

  return intervalId;
}

function HeaderIcon() {
  // SVG kept inline to preserve original look without external assets.
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.55993 16.7373C3.22279 18.0344 4.97707 19.423 2.28564 21.3087C2.28564 21.3087 3.8685 21.8401 5.30279 20.0344C5.79422 19.4116 6.36564 19.1544 6.36564 19.1544C6.55993 19.2687 6.41136 19.903 5.71993 20.423C5.71993 20.423 6.79993 20.4516 7.47422 19.7773C8.1485 19.103 8.60564 18.1316 8.60564 18.1316C9.0685 18.943 7.9085 19.9716 7.9085 19.9716C7.9085 19.9716 8.99993 19.6859 10.2971 18.3887C11.3028 17.383 12.0228 14.8744 10.5771 13.4344C9.13136 11.9944 6.55422 12.2516 5.29136 13.5201C4.73707 14.0744 4.17136 14.9373 4.09707 15.6459C4.09707 15.6459 5.15993 14.4973 5.53707 14.983C5.53707 14.983 3.73707 16.0687 3.44564 17.103C3.45136 17.103 4.3485 16.5659 4.55993 16.7373Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M3.56575 17.7261C2.16575 18.2861 3.06861 19.4632 2.46289 20.0689C2.46289 20.0689 3.26861 19.6289 3.25718 18.7661C3.24575 18.0632 3.56575 17.7261 3.56575 17.7261Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M3.89136 21.8117C4.25136 21.7717 4.85707 20.726 5.67993 20.8974C5.67993 20.8974 4.94279 21.9717 3.89136 21.8117Z"
        fill="url(#paint2_linear)"
      />
      <path
        opacity="0.5"
        d="M8.31995 19.7144C8.75995 19.5487 9.50852 19.183 10.2971 18.3887C11.1828 17.503 11.92 14.9887 10.4685 13.543C9.05138 12.1259 6.56567 12.4116 5.37138 13.6059C4.94281 14.0344 4.48567 14.6802 4.30281 15.2744C4.55995 15.0459 4.94281 14.7602 5.26281 14.7259C5.42852 14.7087 5.55995 14.7659 5.65138 14.8802L5.74281 14.9944L5.58281 15.0916C5.56567 15.103 4.17138 15.9544 3.6971 16.823C4.02281 16.6573 4.46852 16.4744 4.65138 16.623L4.75424 16.7087L4.63424 16.8287C4.1371 17.3144 4.10852 17.8116 4.08567 18.3887C4.04567 19.2173 3.99995 20.1487 2.59424 21.2287C3.07424 21.2916 4.16567 21.263 5.19995 19.9659C5.71424 19.3144 6.30852 19.0402 6.33138 19.0287L6.39995 19.0002L6.45138 19.0287C6.54852 19.0859 6.59424 19.2116 6.5771 19.3773C6.55424 19.6059 6.40567 19.9316 6.08567 20.263C6.43995 20.2173 6.99424 20.0859 7.38852 19.6916C8.03424 19.0459 8.47995 18.1087 8.48567 18.0973L8.61138 17.8287L8.73138 18.0402C9.03995 18.5887 8.69709 19.2573 8.31995 19.7144Z"
        fill="url(#paint3_linear)"
      />
      <path
        d="M2.46289 20.0689C2.85718 19.7489 3.26289 19.1204 3.25718 18.7661C3.25146 18.4404 3.34289 17.9832 3.56575 17.7261C2.58289 18.1432 2.72003 18.8004 2.84575 19.1261C2.90289 19.2689 2.8286 19.6918 2.46289 20.0689Z"
        fill="url(#paint4_radial)"
      />
      <path
        d="M3.2229 21.0346C5.08576 20.4232 5.5829 18.3089 6.77719 17.9432C7.97719 17.5775 7.67433 18.7204 7.21147 19.2404C7.21147 19.2404 8.79433 17.6518 8.80004 16.4118C8.81147 15.1718 10.4743 17.1089 9.96004 18.1146C9.96004 18.1146 12.5029 15.5718 10.4686 13.5432C8.43433 11.5146 5.73147 13.5375 5.73147 13.5375C5.73147 13.5375 7.27433 13.4746 7.13719 14.5946C7.13719 14.5946 5.94861 15.0461 5.01147 15.7946C5.01147 15.7946 5.46862 15.8461 5.7829 16.3146C5.7829 16.3146 4.3829 17.2804 4.44004 18.1089C4.52004 19.1775 3.8229 20.8404 3.2229 21.0346Z"
        fill="url(#paint5_linear)"
      />
      <path
        d="M4.52563 19.4287C5.39421 19.2115 6.15992 17.1772 7.38278 17.2915C8.05706 17.3544 7.90278 17.9372 7.90278 17.9372C7.90278 17.9372 8.37135 17.2687 8.47992 16.3715C8.58849 15.4744 10.2628 15.7772 10.1885 17.4687C10.1885 17.4687 12.0285 15.0744 9.79421 13.5487C7.33135 11.8687 5.52564 13.9772 5.52564 13.9772C5.52564 13.9772 7.21135 13.4172 7.47421 14.7544C7.47421 14.7544 6.07992 15.1429 5.56564 15.6572C5.56564 15.6572 6.15992 15.7429 6.30278 16.3772C6.30278 16.3772 4.93135 17.3829 4.97135 17.7829C5.06849 18.7372 4.52563 19.4287 4.52563 19.4287Z"
        fill="url(#paint6_linear)"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="6.23809" y1="12.3993" x2="5.91263" y2="21.8115" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#FFB200" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="2.53753" y1="17.615" x2="3.53182" y2="19.4046" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB200" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
        <linearGradient id="paint2_linear" x1="3.89211" y1="20.895" x2="5.48643" y2="21.605" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB200" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
        <linearGradient id="paint3_linear" x1="7.01855" y1="12.7156" x2="6.74111" y2="21.2304" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB200" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
        <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.31292 18.932) rotate(64.0556) scale(1.54365 2.7335)">
          <stop stopColor="#FFED1C" />
          <stop offset="1" stopColor="#FFED1C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="paint5_linear" x1="6.35473" y1="12.5146" x2="6.05986" y2="21.8508" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#FFB200" />
        </linearGradient>
        <linearGradient id="paint6_linear" x1="6.65628" y1="12.932" x2="6.37886" y2="21.1172" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB200" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FilePreview({ file, url }) {
  const ext = getExt(file?.name);

  if (IMAGE_TYPES.includes(ext) && url) {
    return (
      <div className="file-preview">
        <img src={url} alt="preview" />
      </div>
    );
  }

  if (AUDIO_TYPES.includes(ext)) {
    return (
      <div className="file-preview">
        <div className="file-preview-icon">🎵</div>
      </div>
    );
  }
  if (VIDEO_TYPES.includes(ext)) {
    return (
      <div className="file-preview">
        <div className="file-preview-icon">🎬</div>
      </div>
    );
  }
  if (DOC_TYPES.includes(ext)) {
    return (
      <div className="file-preview">
        <div className="file-preview-icon">{getDocIcon(ext)}</div>
      </div>
    );
  }

  return (
    <div className="file-preview">
      <div className="file-preview-icon">📁</div>
    </div>
  );
}

function StatusIcon({ status, isPaused }) {
  if (status === "uploading") {
    return (
      <div className="file-status" aria-label={isPaused ? "paused" : "uploading"}>
        <svg className="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="15.7 62.8"
          />
        </svg>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="file-status" aria-label="completed">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" />
          <path
            d="M8 12l2 2 6-6"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="file-status" aria-label="error">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
          <path d="M15 9L9 15M9 9L15 15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return null;
}

export default function UploadProgress() {
  const fileInputRef = useRef(null);
  const objectUrlsRef = useRef(new Map());
  const intervalsRef = useRef({});

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesStatus, setSelectedFilesStatus] = useState({});
  const [imageUrlsByKey, setImageUrlsByKey] = useState({});
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLabel, setProgressLabel] = useState("%0");
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const isUploadingRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isUploadingRef.current = isUploading;
  }, [isUploading]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const hasGlow = isUploading && !isPaused && progressPercent < 100;

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach((id) => clearInterval(id));
      intervalsRef.current = {};
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  const totalBytes = useMemo(() => {
    return Math.max(
      selectedFiles.reduce((sum, file) => sum + (file?.size || 0), 0),
      1
    );
  }, [selectedFiles]);

  const completedCount = useMemo(
    () => Object.values(selectedFilesStatus).filter((s) => s === "completed").length,
    [selectedFilesStatus]
  );
  const errorCount = useMemo(
    () => Object.values(selectedFilesStatus).filter((s) => s === "error").length,
    [selectedFilesStatus]
  );

  useEffect(() => {
    // Manage object URLs outside render; keep them stable and revoke unused.
    const nextMap = new Map();
    const nextObj = {};
    const usedKeys = new Set();

    selectedFiles.forEach((file, idx) => {
      const ext = getExt(file?.name);
      if (!IMAGE_TYPES.includes(ext)) return;

      const key = `${idx}:${file?.name}:${file?.size}:${file?.lastModified}`;
      usedKeys.add(key);

      if (objectUrlsRef.current.has(key)) {
        const url = objectUrlsRef.current.get(key);
        nextMap.set(key, url);
        nextObj[key] = url;
        return;
      }

      const url = URL.createObjectURL(file);
      nextMap.set(key, url);
      nextObj[key] = url;
    });

    objectUrlsRef.current.forEach((url, key) => {
      if (!usedKeys.has(key)) URL.revokeObjectURL(url);
    });

    objectUrlsRef.current = nextMap;
    setImageUrlsByKey(nextObj);
  }, [selectedFiles]);

  function resetAll() {
    Object.values(intervalsRef.current).forEach((id) => clearInterval(id));
    intervalsRef.current = {};

    setProgressPercent(0);
    setProgressLabel("%0");
    setSelectedFiles([]);
    setSelectedFilesStatus({});
    setIsUploading(false);
    setIsPaused(false);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function showFileInfo(files) {
    const status = {};
    files.forEach((_, idx) => {
      status[idx] = "waiting";
    });
    setSelectedFilesStatus(status);
  }

  function startUpload(files) {
    if (!files.length || isUploadingRef.current) return;

    setIsUploading(true);
    setIsPaused(false);

    setProgressPercent(0);
    setProgressLabel("Yukleniyor...");

    const total = Math.max(files.reduce((sum, f) => sum + (f?.size || 0), 0), 1);
    let uploadedBytes = 0;
    let fileIndex = 0;

    const updateOverallProgress = (currentFileBytes) => {
      const loaded = Math.min(uploadedBytes + currentFileBytes, total);
      const rawPercent = (loaded / total) * 100;
      const safePercent = Number.isFinite(rawPercent) ? Math.min(100, Math.max(0, rawPercent)) : 0;

      setProgressPercent(safePercent);
      const displayPercent =
        safePercent >= 100 ? 100 : loaded > 0 && safePercent < 1 ? 1 : Math.floor(safePercent);
      setProgressLabel(`%${displayPercent}`);

      if (safePercent >= 100) {
        setProgressLabel("Yukleme tamamlandi!");
        setIsUploading(false);

        confetti({
          particleCount: 200,
          spread: 100,
          startVelocity: 40,
          scalar: 1.2,
          origin: { y: 0.6 },
        });
      }
    };

    const uploadNextFile = () => {
      if (fileIndex >= files.length) {
        updateOverallProgress(total);
        return;
      }

      const file = files[fileIndex];
      const thisIndex = fileIndex; // capture to avoid closure bugs across intervals
      setSelectedFilesStatus((prev) => ({ ...prev, [thisIndex]: "uploading" }));

      const intervalId = createUploadTicker(file, {
        isUploadingRef,
        isPausedRef,
        onTick: (evt) => {
          if (evt.kind === "error") {
            // Error: mark file as error, do not count its bytes, continue.
            setSelectedFilesStatus((prev) => ({ ...prev, [thisIndex]: "error" }));
            fileIndex += 1;
            uploadNextFile();
            return;
          }

          updateOverallProgress(evt.current);

          if (evt.current >= evt.total) {
            setSelectedFilesStatus((prev) => ({ ...prev, [thisIndex]: "completed" }));
            uploadedBytes += evt.total;
            fileIndex += 1;
            uploadNextFile();
          }
        },
      });

      intervalsRef.current[thisIndex] = intervalId;
    };

    uploadNextFile();
  }

  function handleFilesChosen(files) {
    setSelectedFiles(files);
    if (!files.length) return;
    showFileInfo(files);
    startUpload(files);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <div className={`backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-center ${isPaused ? "paused" : ""}`}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <HeaderIcon />
          <h1 className="text-2xl font-bold">Dosya Yukleme</h1>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          disabled={isUploading}
          onChange={(e) => handleFilesChosen(Array.from(e.target.files || []))}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFilesChosen(Array.from(e.dataTransfer.files || []));
          }}
          className={[
            "border-2 border-dashed rounded-2xl p-6 mb-4 transition cursor-pointer",
            isDragOver ? "border-blue-400" : "border-gray-500",
            isUploading ? "opacity-60 pointer-events-none" : "hover:border-blue-400",
          ].join(" ")}
        >
          <p className="text-sm text-gray-300">Dosyalari buraya surukle veya tikla</p>
        </div>

        <div className="flex gap-3 items-center justify-between text-left mb-4">
          <div className={`text-sm text-gray-300 min-h-[3rem] w-full ${selectedFiles.length ? "" : "hidden"}`}>
            {selectedFiles.length > 1 ? (
              <>
                <div style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
                  Toplam: {selectedFiles.length} dosya ({formatBytes(totalBytes)}) | ✅ {completedCount} | ❌ {errorCount}
                </div>
                <div className="file-list">
                  {selectedFiles.map((file, idx) => {
                    const status = selectedFilesStatus[idx] || "waiting";
                    const ext = getExt(file?.name);
                    const key = `${idx}:${file?.name}:${file?.size}:${file?.lastModified}`;
                    const url = IMAGE_TYPES.includes(ext) ? imageUrlsByKey[key] : null;
                    return (
                      <div
                        key={key}
                        className={`file-item-with-preview ${status === "error" ? "file-item-error" : ""}`}
                      >
                        <FilePreview file={file} url={url} />
                        <div>
                          <div className="file-name">{file.name}</div>
                          <div className="file-size">{formatBytes(file.size)}</div>
                        </div>
                        <StatusIcon status={status} isPaused={isPaused} />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div>Dosya: 1</div>
                <div>Boyut: {formatBytes(selectedFiles[0]?.size || 0)}</div>
                <div>{selectedFiles[0]?.name}</div>
              </>
            )}
          </div>

          <div
            className={`file-preview-box flex items-center justify-center gap-2 ${selectedFiles.length === 1 ? "" : "hidden"}`}
            style={{ minWidth: 120, flexShrink: 0 }}
          >
            {selectedFiles.length === 1 ? (
              <FilePreview
                file={selectedFiles[0]}
                url={(() => {
                  const file = selectedFiles[0];
                  const ext = getExt(file?.name);
                  const key = `0:${file?.name}:${file?.size}:${file?.lastModified}`;
                  return IMAGE_TYPES.includes(ext) ? imageUrlsByKey[key] : null;
                })()}
              />
            ) : null}
          </div>
        </div>

        <div className="w-full bg-gray-700/50 rounded-full h-5 overflow-hidden mb-4">
          <div
            className={[
              "h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500",
              hasGlow ? "glow" : "",
            ].join(" ")}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-sm text-gray-300 mb-4">{progressLabel}</p>

        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={resetAll}
            className="bg-gray-600 px-4 py-2 rounded-xl hover:bg-gray-700 transition w-full"
          >
            Sifirla
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isUploadingRef.current) return;
              setIsPaused((prev) => !prev);
            }}
            className={`bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full ${isUploading ? "" : "hidden"}`}
          >
            {isPaused ? "Devam Et" : "Durdur"}
          </button>
        </div>
      </div>
    </div>
  );
}
