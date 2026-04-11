const Input = ({
  label,
  placeholder = "",
  type = "text",
  error = "",
  value,
  onChange,
  name,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          border rounded-lg px-3 py-2 text-sm outline-none transition
          ${error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
          ${className}
        `}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;