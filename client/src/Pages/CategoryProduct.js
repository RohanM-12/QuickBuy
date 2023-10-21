import Layout from "../Components/Layout/Layout";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="mt-3 container">
        <h4 className="text-center">Category-{category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "15rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 18)}...
                  </p>
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
