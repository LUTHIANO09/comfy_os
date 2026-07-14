function Select({
  label,
  value,
  onChange,
  name,
  options = [],
  className = "",
  disabled = false,
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          transition
          focus:border-slate-900
          focus:ring-2
          focus:ring-slate-200
          disabled:bg-slate-100
          disabled:cursor-not-allowed
          ${className}
        `}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}

export default Select;