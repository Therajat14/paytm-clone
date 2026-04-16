import React from "react";
import { Link } from "react-router-dom";

const AuthFooter = ({ text, linkText, to }) => {
  return (
    <p className="text-sm text-gray-500 text-center">
      {text}{" "}
      <Link to={to} className="text-black font-medium hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;
