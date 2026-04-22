import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

import "../upload-progress.css";

import Controls from "./uploadProgress/Controls";
import DropZone from "./uploadProgress/DropZone";
import FileList from "./uploadProgress/FileList";
import FilePreview from "./uploadProgress/FilePreview";
import HeaderIcon from "./uploadProgress/HeaderIcon";
import ProgressBar from "./uploadProgress/ProgressBar";
import { IMAGE_TYPES } from "./uploadProgress/constants";
import { createUploadTicker, formatBytes, getExt } from "./uploadProgress/utils";

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
      <div
        className={`backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-center ${isPaused ? "paused" : ""}`}
      >
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

        <DropZone
          disabled={isUploading}
          isDragOver={isDragOver}
          onPickFilesClick={() => fileInputRef.current?.click()}
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
        />

        <div className="flex gap-3 items-center justify-between text-left mb-4">
          <div className={`text-sm text-gray-300 min-h-[3rem] w-full ${selectedFiles.length ? "" : "hidden"}`}>
            {selectedFiles.length > 1 ? (
              <>
                <FileList
                  files={selectedFiles}
                  statuses={selectedFilesStatus}
                  imageUrlsByKey={imageUrlsByKey}
                  totalBytes={totalBytes}
                />
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
                size="lg"
              />
            ) : null}
          </div>
        </div>

        <ProgressBar percent={progressPercent} glow={hasGlow} />

        <p className="text-sm text-gray-300 mb-4">{progressLabel}</p>

        <Controls
          isUploading={isUploading}
          isPaused={isPaused}
          onReset={resetAll}
          onTogglePause={() => {
            if (!isUploadingRef.current) return;
            setIsPaused((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}
