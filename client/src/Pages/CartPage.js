import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

import Modal from "antd/es/modal/Modal";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [addr, setAddr] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);

      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Modal
  const handleModalOk = () => {
    setIsModalOpen(false);
    localStorage.clear();
    window.location.reload();
  };

  // show modal

  const totalPrice = () => {
    let total = 0;
    try {
      cart?.map((item) => {
        total = total + item.price;
        //  return total;
      });
      return total.toString();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1 ">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center mb-4">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your Cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row card-img-top">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="50px"
                    height="50px"
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p style={{ fontSize: "18px", fontWeight: "bolder" }}>
                    Price : ₹{p.price}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center col-md-4">
            <h2>Cart Summary</h2>
            <p> Checkout | Checkout </p>
            <h3 style={{ fontSize: "25px", fontWeight: "bolder" }}>
              Total : ₹ {totalPrice()}{" "}
            </h3>
            <div className="mb-3 ">
              <input
                type="text"
                onChange={(e) => setAddr(e.target.value)}
                className=" m-3  form-control "
                placeholder="Enter address to deliver "
                required
              />
              <button
                className=" m-3 p-2 btn btn-success"
                onClick={() => setIsModalOpen(true)}
              >
                Proceed to checkout
              </button>
            </div>
            {isModalOpen ? (
              <Modal
                title="Order Placed Succesfully..."
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalOk}
              >
                <div class="success-animation">
                  <svg
                    class="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      class="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      class="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
                <h5> Your order will be delivered Soon at {addr}</h5>
              </Modal>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
