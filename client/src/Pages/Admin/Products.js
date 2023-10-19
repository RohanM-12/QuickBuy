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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Products List</h1>
            <div className="row row-cols-1 row-cols-md-5 row-cols-sm-2">
              {products?.map((p) => (
                <div className="col mb-4" key={p._id}>
                  <Link
                    className="text-decoration-none"
                    to={`/dashboard/admin/product/${p.slug}`}
                  >
                    <div className="card" style={{ width: "100%" }}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ objectFit: "cover", height: "200px" }} // Adjust the height of the image
                      />
                      <div className="card-body">
                        <h5 className="card-title">{trimText(p.name)}</h5>
                        <p className="card-text">{trimText(p.description)}</p>
                        <p
                          style={{ fontSize: "18px", fontWeight: "bold" }}
                          className="card-text"
                        >
                          ₹{p.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
