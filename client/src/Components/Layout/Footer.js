import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-dark text-light p-3">
      <h4 className="text-center">All Right Reserved &copy; Rohan-M </h4>
      {/* <h4 className="text-center">Email - Rohanmali.2002@gmail.com </h4> */}
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>
      </p>
    </div>
  );
};

export default Footer;
