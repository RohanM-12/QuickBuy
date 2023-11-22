import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useCart } from "../Context/Cart";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { Carousel } from "antd";
import { useAuth } from "../Context/Auth";
import { BiSolidCartAlt } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { ImSpinner } from "react-icons/im";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const auth = useAuth();

  //get  Recommendations
  const getRecommendations = async () => {
    const userEmail = auth && auth[0] && auth[0].user && auth[0].user.email;

    if (userEmail) {
      try {
        const response = await axios.get(
          `/api/v1/product/get-recommendations/${userEmail}`
        );

        setRecommendations(response.data.sortedProducts);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    }
  };
  useEffect(() => {
    getRecommendations();
  }, [auth]);
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

  // carousel recommedations
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % recommendations.length;
        return nextSlide;
      });
    }, 4000); // Change slide every 5 seconds (5000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [recommendations]);

  // slideshow
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  // getall product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);

      getRecommendations();
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
            <h5 className=" mt-4 fw-bolder text-center">Filter by Category</h5>
            <hr />
            <div className=" d-flext flex-column">
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
            <h5 className=" fw-bolder mt-4 text-center">Filter by Price</h5>
            <hr />
            <div className=" d-flex flex-column">
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
                className="mt-4 btn btn-primary"
                onClick={() => window.location.reload()}
              >
                <IoMdCloseCircle />
                {" - "} Clear all Filters
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1 className=" fw-bold text-center">All Products</h1>
            <hr />
            {auth && auth[0] && auth[0].user ? (
              <>
                <h5 className=" text-center mt-4 fw-bolder ">
                  Recommendations
                </h5>
                <div className=" mt-4 container">
                  <div className="col-md-11 ">
                    <Carousel
                      autoplay
                      autoplaySpeed={4000}
                      dotPosition="none"
                      currentSlide={currentSlide}
                    >
                      {Array.isArray(recommendations) &&
                        recommendations.map((recommendation, index) => (
                          <div key={recommendation._id} className="col-md-8">
                            <div
                              key={recommendation._id}
                              style={{
                                marginLeft: "10px",
                                width: "1000px",
                                height: "300px",
                              }}
                              className="row card flex-row card-img-top"
                            >
                              <div className=" mx-4 col-md-3">
                                <img
                                  src={`/api/v1/product/product-photo/${recommendation._id}`}
                                  className=" w-100 h-100 card-img-top"
                                  alt={recommendation.name}
                                />
                              </div>
                              <div className=" mx-4 col-md-4">
                                <table className="m-4 w-100 table table text-s">
                                  <tbody className="h5">
                                    <tr>
                                      <th
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Name
                                      </th>
                                      <td>{recommendation.name}</td>
                                    </tr>
                                    <tr>
                                      <th
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Description
                                      </th>
                                      <td>
                                        {" "}
                                        {recommendation.description.substring(
                                          0,
                                          45
                                        )}
                                        ...
                                      </td>
                                    </tr>
                                    <tr>
                                      <th
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Price
                                      </th>
                                      <td style={{ fontWeight: "bold" }}>
                                        {" "}
                                        <p
                                          style={{
                                            fontSize: "30px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {" "}
                                          ₹{" "}
                                          {recommendation.price.toLocaleString()}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Carousel>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="  container">
                  <Carousel autoplay>
                    <img
                      style={contentStyle}
                      src={process.env.PUBLIC_URL + "/Images/banner1.jpg"}
                      alt="Banner1"
                      height={300}
                    />
                    <img
                      style={contentStyle}
                      src={process.env.PUBLIC_URL + "/Images/banner2.jpg"}
                      alt="Banner2"
                      height={300}
                    />
                    <img
                      style={contentStyle}
                      src={process.env.PUBLIC_URL + "/Images/banner3.jpg"}
                      alt="Banner2"
                      height={300}
                    />
                    <img
                      style={contentStyle}
                      src={process.env.PUBLIC_URL + "/Images/banner4.jpg"}
                      alt="Banner2"
                      height={300}
                    />
                  </Carousel>
                </div>
              </>
            )}
            <hr />
            <div className=" mt-3 d-flex flex-wrap">
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
                      ₹{p.price.toLocaleString()}
                    </p>
                    <div className="row m-1">
                      <button
                        href="#"
                        className=" mb-1 btn btn-primary "
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        <CgDetailsMore /> More Details
                      </button>
                      <button
                        href="#"
                        className=" btn btn-secondary "
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("item added to cart");
                        }}
                      >
                        <BiSolidCartAlt /> {" - "}Add to Cart
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
                    <>
                      <button
                        className=" text-dark   btn btn-outline-warning"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                      >
                        <ImSpinner /> {loading ? "Loading ... " : "Load More"}
                      </button>
                    </>
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
