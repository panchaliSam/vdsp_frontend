import React from "react";

interface DropdownFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className={`w-full max-w-sm ${className || ""}`}>
      <label className="block mb-2 text-sm text-slate-600">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
        style={{
          color: className?.includes("text-white") ? "white" : undefined,
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-slate-700"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
