import React from "react";

const ErrorMessage = ({ text }) => {
  if (!text) return null;

  return <p className="text-sm text-red-500 mt-1">{text}</p>;
};

export default ErrorMessage;
