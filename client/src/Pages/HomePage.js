import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";

import axios from "axios";
import { Checkbox } from "antd";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // getall product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // filter by category

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // functoin to manage text
  function trimText(text) {
    if (text.length > 20) {
      return text.slice(0, 16) + "...";
    }
    return text;
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row mt-3">
        <div className="mx-2 col-md-2">
          <h5 className="text-center">Filter By Category</h5>
          {categories.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        <div className="col-md-9">
          {JSON.stringify(checked, null, 4)}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "15rem" }}>
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
                  <div className="row m-1">
                    <button href="#" className=" mb-1 btn btn-primary ">
                      More Details
                    </button>
                    <button href="#" className=" btn btn-secondary ">
                      Add to Cart{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
