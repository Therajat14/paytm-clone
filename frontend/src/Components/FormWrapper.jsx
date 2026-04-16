import React from "react";
import Heading from "./Heading";
import SubHeading from "./Subheading";
import Card from "./Card";

const FormWrapper = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card>
        <div className="space-y-6">
          <div className="space-y-2">
            <Heading title={title} align="center" />
            <SubHeading text={subtitle} align="center" />
          </div>

          {children}
        </div>
      </Card>
    </div>
  );
};

export default FormWrapper;
