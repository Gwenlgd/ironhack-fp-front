import React from "react";

const LayoutContainer = ({ children }) => {
  return (
    <div className="mx-4 mt-20 sm:mx-6 sm:mt-6 md:mx-10 md:mt-8 lg:mx-20 lg:mt-10">
      {children}
    </div>
  );
};

export default LayoutContainer;
