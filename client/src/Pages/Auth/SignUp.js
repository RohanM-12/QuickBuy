import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoPersonAdd } from "react-icons/io5";
import axios from "axios";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //handle submit form functuoin

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
            <h1 className="signup-title">SignUp</h1>
            <div className="mb-3 ">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" form-control "
                id="exampleInputEmail1"
                placeholder="Name"
                required
              />
            </div>
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
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder=" Phone No."
                required
              />
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder=" Addresss"
                required
              />
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your favorite sport?"
                required
              />
            </div>
            <button type="submit" className=" btn-submit btn btn-primary">
              <IoPersonAdd />
              {" - "}SignUp
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
