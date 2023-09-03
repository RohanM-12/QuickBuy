import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  // functoin to manage text
  function trimText(text) {
    if (text.length > 20) {
      return text.slice(0, 16) + "...";
    }
    return text;
  }

  //LIfecylcle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-sm-9 ">
          <h1 className="text-center">All Products List</h1>

          <div className="d-flex">
            {products?.map((p) => (
              <Link
                className="text-decoration-none"
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
              >
                <div className="card m-2" style={{ width: "14rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{trimText(p.name)}</h5>
                    <p className="card-text">{trimText(p.description)}</p>
                    <p
                      style={{ fontSize: "20px", fontWeight: "bolder" }}
                      className="card-text"
                    >
                      ₹{p.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
