import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Context/search";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found "
              : `Found ${values.results.length} matching results for "${values.keyword}" `}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "15rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body ">
                  <h5 className="card-title">{p.name.substring(0, 17)}</h5>
                  <p className=" card-text">
                    {p.description.substring(0, 17)}...
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

export default Search;
