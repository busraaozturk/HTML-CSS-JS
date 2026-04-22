import { AUDIO_TYPES, DOC_TYPES, IMAGE_TYPES, VIDEO_TYPES } from "./constants";
import { getDocIcon, getExt } from "./utils";

export default function FilePreview({ file, url, size = "sm" }) {
  const ext = getExt(file?.name);
  const sizeClass = size === "lg" ? "file-preview file-preview--lg" : "file-preview";
  const iconClass = size === "lg" ? "file-preview-icon file-preview-icon--lg" : "file-preview-icon";

  if (IMAGE_TYPES.includes(ext) && url) {
    return (
      <div className={sizeClass}>
        <img src={url} alt="preview" />
      </div>
    );
  }

  if (AUDIO_TYPES.includes(ext)) {
    return (
      <div className={sizeClass}>
        <div className={iconClass}>AUDIO</div>
      </div>
    );
  }
  if (VIDEO_TYPES.includes(ext)) {
    return (
      <div className={sizeClass}>
        <div className={iconClass}>VIDEO</div>
      </div>
    );
  }
  if (DOC_TYPES.includes(ext)) {
    return (
      <div className={sizeClass}>
        <div className={iconClass}>{getDocIcon(ext)}</div>
      </div>
    );
  }

  return (
    <div className={sizeClass}>
      <div className={iconClass}>FILE</div>
    </div>
  );
}

