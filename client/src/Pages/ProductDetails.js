import React from "react";
import Layout from "../Components/Layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  const [relatedProducts, setRelatedProducts] = useState([]);
  // inital prod details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      console.log(data.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get similar products

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className=""
            alt={product.name}
            height="300"
            width="300"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center  "> Product Details </h1>
          <table className="table table-borderless text-s">
            <tbody className="h5">
              <tr>
                <th scope="row" style={{ fontWeight: "bold" }}>
                  Name
                </th>
                <td>{product.name}</td>
              </tr>
              <tr>
                <th scope="row" style={{ fontWeight: "bold" }}>
                  Category
                </th>
                <td>{product.category?.name}</td>
              </tr>
              <tr>
                <th scope="row" style={{ fontWeight: "bold" }}>
                  Description
                </th>
                <td> {product.description}</td>
              </tr>
              <tr>
                <th scope="row" style={{ fontWeight: "bold" }}>
                  Price
                </th>
                <td style={{ fontWeight: "bold" }}>
                  {" "}
                  <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {" "}
                    ₹ {product.price}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <button href="#" className=" btn btn-secondary ">
            Add to Cart{" "}
          </button>
        </div>
      </div>
      <div className="row">
        <h3 className="m-3 fw-semibold">Similar Products</h3>
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "15rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 18)}...</p>
                <p
                  style={{ fontSize: "20px", fontWeight: "bolder" }}
                  className="card-text"
                >
                  ₹{p.price}
                </p>
                <div className="row m-1">
                  <button href="#" className=" btn btn-secondary ">
                    Add to Cart{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
