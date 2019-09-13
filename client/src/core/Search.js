import React, { useState, useEffect } from "react";
import { apiService } from "../services/api-service";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, searched, results } = data;

  const loadCategories = async () => {
    const response = await apiService.getCategories();
    if (response.error) {
      console.log(data.error);
      return;
    }
    setData({ ...data, categories: response });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchingSubmit = event => {
    event.preventDefault();
    searchData();
  };

  const searchData = () => {};

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchingForm = () => {
    return (
      <form onSubmit={searchingSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select
                className="btn mr-2"
                handleChange={handleChange("category")}
              >
                <option value="All">Pick Category</option>
                {categories.map((c, i) => (
                  <option value={c._id} key={i}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row">
      <div className="container mb-3">{searchingForm()}</div>
    </div>
  );
};

export default Search;
