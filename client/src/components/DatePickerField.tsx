import React from "react";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  minDate?: string;
  maxDate?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  minDate,
  maxDate,
}) => {
  return (
    <div className={`w-full max-w-sm ${className || ""}`}>
      <label className="block mb-2 text-sm text-white">{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={minDate}
        max={maxDate}
        className={`w-full bg-transparent placeholder:text-white text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
        style={{
          WebkitAppearance: "none", // Removes browser-specific styling
          appearance: "none",
        }}
      />
      <style jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1); /* Makes the calendar icon white */
        }

        /* Custom year color (inside calendar UI) */
        input[type="date"]::-webkit-datetime-edit-year-field,
        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field {
          color: white; /* Changes year, month, and day text color */
        }
      `}</style>
    </div>
  );
};

export default DatePickerField;
