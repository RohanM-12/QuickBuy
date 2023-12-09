import React from "react";
import { BsMailbox } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer ">
      <h4 className="text-center">
        All Right Reserved &copy; Personal Project{" "}
      </h4>
      <h4 className="text-center">
        {" "}
        <BsMailbox /> Email - Rohanmali.2002@gmail.com{" "}
      </h4>
      <p className="  text-center mt-3 ">
        <Link className="footer-link" to="/about">
          About
        </Link>
      </p>
    </div>
  );
};

export default Footer;
