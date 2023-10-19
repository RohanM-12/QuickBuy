import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //gettotal count

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load More

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [checked, radio]);

  //get filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" row mt-3">
        <div className="  container-fluid row mt-3">
          <div className=" border-black x-2 col-md-2">
            <h5 className="text-center">Filter by Category</h5>
            <div className="d-flext flex-column">
              {categories.map((c) => (
                <Checkbox
                  className="m-1"
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h5 className="mt-4 text-center">Filter by Price</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio className="m-1" value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="m-2 btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Clear all Filters
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "15rem" }}
                >
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
                      <button
                        href="#"
                        className=" mb-1 btn btn-primary "
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
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

            <div className="row align-items-center">
              <div className="col text-center">
                <div className="m-2 p-3 ">
                  {products && products.length < total && (
                    <button
                      className=" text-dark   btn btn-outline-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading ... " : "Load More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
