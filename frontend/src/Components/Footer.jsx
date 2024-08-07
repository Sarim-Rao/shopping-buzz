import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-primary text-light text-center">
      All Right Reserved &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
