import { MIN_FILE_DURATION_MS, UPLOAD_SPEED_MBPS } from "./constants";

export function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${sizes[index]}`;
}

export function getExt(fileName) {
  const parts = String(fileName || "").split(".");
  return (parts[parts.length - 1] || "").toLowerCase();
}

export function getDocIcon(ext) {
  const iconMap = {
    pdf: "PDF",
    doc: "DOC",
    docx: "DOCX",
    xls: "XLS",
    xlsx: "XLSX",
    ppt: "PPT",
    pptx: "PPTX",
    txt: "TXT",
    rtf: "RTF",
  };
  return iconMap[ext] || "FILE";
}

// Vanilla version: tick 100ms, per-file 10% failure chance at random point (20%-80%).
export function createUploadTicker(file, { isUploadingRef, isPausedRef, onTick }) {
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

