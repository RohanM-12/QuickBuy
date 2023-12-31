import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GrShop } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import { BsCartFill, BsFillInfoCircleFill } from "react-icons/bs";

import { FaListAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";

import { useCart } from "../../Context/Cart";
import { Badge } from "antd";
import { BiSolidDashboard, BiSolidLogInCircle } from "react-icons/bi";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GrShop /> QuickBuy
            </Link>
            <ul className="  navbar-nav ms-auto mb-1 mb-lg-0">
              <SearchInput />
              <li className="  mx-2  nav-item">
                <NavLink to="/" className="nav-link ">
                  <AiFillHome /> {" - "}
                  Home
                </NavLink>
              </li>
              <li style={{ fontSize: "20px" }} className="dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  <FaListAlt />
                  {" - "} Categories
                </Link>

                <ul style={{ fontSize: "20px" }} className="dropdown-menu">
                  {categories.map((c) => (
                    <li key={c._id}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="dropdown-item"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="  mx-2  nav-item">
                    <NavLink to="/signup" className="nav-link" href="#">
                      <IoPersonAdd />
                      {" - "} SignUp
                    </NavLink>
                  </li>
                  <li className="  mx-2  nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      <RiLoginCircleFill /> {" - "}LogIn
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    style={{ fontSize: "15px" }}
                    className=" mx-2 nav-item dropdown  "
                  >
                    <button
                      style={{ fontSize: "20px" }}
                      className=" nav-link   dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserCircle className="mx-1" />
                      {auth?.user?.name}
                    </button>
                    <ul
                      style={{
                        float: "left",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                      className="dropdown-menu  dropdown-menu"
                    >
                      <li>
                        <NavLink
                          className="nav-link"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          <BiSolidDashboard /> {" - "}
                          Dashboard
                        </NavLink>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link"
                          href="#"
                        >
                          <BiSolidLogInCircle /> {" - "}
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="  mx-1  nav-item">
                <NavLink to="/cart" className="  nav-link" href="#">
                  <BsCartFill />
                  {" - "}
                  Cart
                  <Badge
                    className=" mx-1 site-badge-count-109"
                    count={cart.length}
                    style={{
                      backgroundColor: "#007bff",
                      position: "relative",
                    }}
                  />
                </NavLink>
              </li>
              <li className="  mx-1  nav-item">
                <NavLink to="/about" className="nav-link ">
                  <BsFillInfoCircleFill /> {" - "}
                  About/Portfolio
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
