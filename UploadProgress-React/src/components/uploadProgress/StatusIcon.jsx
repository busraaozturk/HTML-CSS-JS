export default function StatusIcon({ status }) {
  if (status === "uploading") {
    return (
      <div className="file-status" aria-label="uploading">
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

