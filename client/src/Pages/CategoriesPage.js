import React from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
const CategoriesPage = () => {
  const categories = useCategory();

  return (
    <Layout>
      <h1 className="text-center">All Categories</h1>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <button className="btn btn-primary " name={c.name}>
                <Link className="btn btn-primary" to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
