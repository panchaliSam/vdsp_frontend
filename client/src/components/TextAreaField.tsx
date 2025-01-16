import React from "react";

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  rows = 1,
  maxLength,
}) => {
  return (
    <div className={`w-full max-w-sm ${className || ""}`}>
      <label className="block mb-2 text-sm text-slate-600">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
        style={{
          color: className?.includes("text-white") ? "white" : undefined,
        }}
      />
    </div>
  );
};

export default TextAreaField;
