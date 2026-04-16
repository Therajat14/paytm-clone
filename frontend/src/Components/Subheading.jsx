import React from "react";

const SubHeading = ({
  text,
  align = "left", // left | center | right
  muted = true,
}) => {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <p
      className={`
        ${alignment[align]}
        text-sm md:text-base
        ${muted ? "text-gray-500" : "text-black"}
        leading-relaxed
        max-w-2xl
      `}
    >
      {text}
    </p>
  );
};

export default SubHeading;
