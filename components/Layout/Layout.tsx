import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div style={{ background: "#F1F0F0" }}>
        <br />
        {children}
      </div>
    </>
  );
};

export default Layout;
