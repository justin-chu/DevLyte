import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="max-w-screen-xl m-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
};
