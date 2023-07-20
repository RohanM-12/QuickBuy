import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GrShop } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
// import { AiFillHome } from "react-icons/ai";
const Header = () => {
  const [auth, setAuth] = useAuth();
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="  mx-2  nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className=" mx-2  nav-item">
                <NavLink to="/category" className="nav-link ">
                  Category
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="  mx-2  nav-item">
                    <NavLink to="/signup" className="nav-link" href="#">
                      SignIn
                    </NavLink>
                  </li>
                  <li className="  mx-2  nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      LogIn
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    style={{ fontSize: "20px" }}
                    className=" mx-2 nav-item dropstart  "
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
                          Dashboard
                        </NavLink>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link"
                          href="#"
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* /////////////////////////////////////////////////////// */}

                  {/* ///////////////////////////////////////////////////////////////////// */}
                </>
              )}
              <li className="  mx-2  nav-item">
                <NavLink to="/cart" className="nav-link" href="#">
                  Cart (0)
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
