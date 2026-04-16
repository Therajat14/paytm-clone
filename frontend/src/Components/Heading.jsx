import React from "react";

const Heading = ({
  title,
  subtitle,
  align = "left", // left | center | right
}) => {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`w-full ${alignment[align]} my-6`}>
      <h1 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-gray-500 text-sm md:text-base">{subtitle}</p>
      )}

      {/* subtle underline accent */}
      <div className="mt-3 h-0.5 w-16 bg-black mx-auto md:mx-0"></div>
    </div>
  );
};

export default Heading;
