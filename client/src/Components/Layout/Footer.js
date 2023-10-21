import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer ">
      <h4 className="text-center">All Right Reserved &copy; Mini Project </h4>
      {/* <h4 className="text-center">Email - Rohanmali.2002@gmail.com </h4> */}
      <p className="  text-center mt-3 ">
        <Link className="footer-link" to="/about">
          About
        </Link>
        |
        <Link className="footer-link" to="/contact">
          Contact
        </Link>
      </p>
    </div>
  );
};

export default Footer;
