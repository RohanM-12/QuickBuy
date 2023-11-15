import React from "react";
import { useSearch } from "../../Context/search";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { BiSolidSearch } from "react-icons/bi";
import { useAuth } from "../../Context/Auth";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      const userEmail = auth && auth[0].user && auth[0].user.email;
      if (userEmail && values.keyword) {
        const keyword = values.keyword;
        axios.put(`/api/v1/auth/insertkeyword/${userEmail}`, { keyword });
      }

      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className=" d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="  form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />

        <button className=" mx-4 w-100 searchBtn" type="submit">
          <BiSolidSearch /> {" - "}
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
