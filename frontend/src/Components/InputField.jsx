import React from "react";

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
}) => {
  return (
    <div className="w-full space-y-1.5">
      {/* Label */}
      <label htmlFor={name} className="text-sm font-medium text-black">
        {label}
        {required && <span className="ml-1 text-black">*</span>}
      </label>

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-3 py-2
          border border-gray-300
          rounded-md
          text-black
          placeholder-gray-400
          outline-none
          transition
          focus:border-black
          focus:ring-1 focus:ring-black
        "
      />
    </div>
  );
};

export default InputField;
