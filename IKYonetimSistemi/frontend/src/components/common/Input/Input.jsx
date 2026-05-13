function Input({ label, value, onChange, type = "text", placeholder}) {
    return (
        <div className="flex flex-col gap-1 mb-3">
            {label && (<label className="text-sm text-gray-600">{label}</label>)}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />  
        </div>
    );
}

export default Input;