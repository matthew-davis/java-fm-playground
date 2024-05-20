import React from "react";
import { NumericInputProps } from "../types/types";

function NumericInput({ value, range, disabled, callback, className }: NumericInputProps) {

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.valueAsNumber;

    if (isNaN(newValue)) { newValue = range.default; }
    else if (newValue < range.min) { newValue = range.min; }
    else if (newValue > range.max) { newValue = range.max; }

    callback(newValue);
  };

  return (
    <div className={className}>
      <input
        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
        disabled={disabled}
        onBlur={handleValueChange}
        onChange={handleValueChange}
        placeholder={range.default.toString()}
        step={range.step}
        type="number"
        value={value}
      />
    </div>
  );
}

export default NumericInput;
