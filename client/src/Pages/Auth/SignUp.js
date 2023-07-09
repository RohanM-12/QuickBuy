import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //handle submit form functuoin

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, address, phone);
    toast.success("Registered successfully");
  };

  return (
    <Layout>
      <div className="signup">
        <h1 className="signup-title">Sign-Up</h1>
        <form onSubmit={handleSubmit} className="w-25">
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
          <button type="submit" className=" btn-submit  btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
