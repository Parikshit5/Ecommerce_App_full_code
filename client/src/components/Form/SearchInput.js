import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-2 mb-md-0 me-md-3 mt-2">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-sm me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{
            width: "200px", // Width of the input field
          }}
        />
        <button
          className="btn btn-outline-success btn-sm"
          type="submit"
          style={{
            padding: "0.4rem 0.75rem", // Slightly increased padding
            fontSize: "0.9rem", // Slightly increased font size
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
