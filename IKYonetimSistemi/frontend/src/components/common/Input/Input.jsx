function Input({ label, name, value, onChange, type = "text", placeholder, disabled = false}) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            {label && (<label className="field-label">{label}</label>)}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="field-input disabled:cursor-not-allowed disabled:bg-accent/30 disabled:text-muted"
            />
        </div>
    );
}

export default Input;