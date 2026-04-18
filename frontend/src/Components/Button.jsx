import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary", // primary | outline
  loading = false,
  onClick,
}) => {
  const base = "w-full py-2.5 rounded-md font-medium transition";

  const variants = {
    primary: "bg-black text-white hover:opacity-90",
    outline: "border border-gray-300 text-black hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`${base} ${variants[variant]} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
