import React from "react";

const FormInput = ({
  inputLabel,
  labelFor,
  inputType,
  inputId,
  inputName,
  placeholderText,
  ariaLabelName,
  error,
  onChange,
  value,
}) => {
  return (
    <div className="font-general-regular mb-4">
      <label
        className="block text-lg text-primary-dark dark:text-primary-light mb-1"
        htmlFor={labelFor}
      >
        {inputLabel}
      </label>
      <input
        className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
        id={inputId}
        name={inputName}
        placeholder={placeholderText}
        aria-label={ariaLabelName}
        onChange={(e) => onChange?.(e)}
        value={value}
      />
      {error && <div className="text-error">{error}</div>}
    </div>
  );
};

export default FormInput;
