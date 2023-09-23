import React from "react";
import Layout from "../Components/Layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6">image</div>
        <div className="col-md-6">details</div>
      </div>
      <div className="row">similar products</div>
    </Layout>
  );
};

export default ProductDetails;
