import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
const Profiles = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //getuser data

  useEffect(() => {
    const { email, name, phone, password, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  //form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="signup">
              <div className="form-container">
                <form onSubmit={handleSubmit} className="">
                  <h1 className="signup-title">User Profile </h1>
                  <div className="mb-3 ">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" form-control "
                      id="exampleInputEmail1"
                      placeholder="Name"
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
                      disabled
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
                    />
                  </div>

                  <button
                    type="submit"
                    className=" btn-submit  btn btn-primary"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profiles;
