import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/Auth";
import axios from "axios";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  //handle submit form functuoin

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="signup">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="">
            <h1 className="signup-title">Login</h1>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
            <label
              className="mb-3"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password ?
            </label>
            <button type="submit" className=" btn-submit  btn btn-primary">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
