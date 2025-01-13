import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  validationFn?: (value: string) => string | null;
  className?: string; 
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  validationFn,
  className, 
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (validationFn) {
      const validationError = validationFn(value);
      setError(validationError);
    }
  };

  return (
    <div className={`w-full max-w-sm ${className || ""}`}>
      <label className="block mb-2 text-sm text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border ${
          error ? "border-red-500" : "border-slate-200"
        } rounded-md px-3 py-2 transition duration-300 ease focus:outline-none ${
          error ? "focus:border-red-500" : "focus:border-slate-400"
        } hover:border-slate-300 shadow-sm focus:shadow`}
        style={error ? undefined : { color: className?.includes("text-white") ? "white" : undefined }}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center">
          <span className="mr-1">❗</span> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
