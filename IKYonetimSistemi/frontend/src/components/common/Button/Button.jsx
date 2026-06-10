function Button ({text, onClick, type = "button", variant = "primary", className = ""}) {
    const variantClass = variant === "outline" ? "btn-outline" : "btn-primary";

    return (
        <button
        type={type}
        onClick={onClick}
        className={`${variantClass} ${className}`.trim()}>
            {text}
        </button>
    );
}

export default Button;