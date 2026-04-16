import React from "react";

const Card = ({ children }) => {
  return (
    <div
      className="
        w-full
        max-w-md
        p-6
        border border-gray-200
        rounded-lg
        bg-white
      "
    >
      {children}
    </div>
  );
};

export default Card;
