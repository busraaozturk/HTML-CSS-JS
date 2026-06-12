function IconButton({ icon, onClick, variant = "default", label }) {
  const variantClass = variant === "danger" ? "icon-btn icon-btn-danger" : "icon-btn";

  return (
    <button
      type="button"
      onClick={onClick}
      className={variantClass}
      aria-label={label}
      title={label}
    >
      <i className={`ti ${icon}`} aria-hidden="true"></i>
    </button>
  );
}

export default IconButton;
