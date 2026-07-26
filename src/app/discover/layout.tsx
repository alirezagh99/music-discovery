import React from "react";

const DiscoverLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-4 container 2xl:max-w-360 mx-auto">{children}</div>;
};

export default DiscoverLayout;
