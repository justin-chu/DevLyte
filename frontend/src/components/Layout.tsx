import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="mt-12 sm:mt-0">{children}</div>
      </div>
      <Footer />
    </>
  );
};
