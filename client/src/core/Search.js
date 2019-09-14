import React, { useState, useEffect } from "react";
import Card from "./Card";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchingSubmit = event => {
    event.preventDefault();
    searchData();
  };

  const searchData = async () => {
    if (search) {
      const response = await apiService.searchList({
        search: search || undefined,
        category
      });
      console.log(response);
      if (response.error) {
        console.log(response.error);
        return;
      }
      setData({ ...data, results: response, searched: true });
    }
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length) {
      return `Found ${results.length} products`;
    }
    if (searched && !results.length) {
      return `No products found`;
    }
  };

  const searchingForm = () => {
    return (
      <form onSubmit={searchingSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All</option>
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

  const searchedProducts = (results = []) => (
    <div>
      <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
      <div className="row">
        {results.map((p, i) => (
          <div className="col-4 mb-3" key={i}>
            <Card product={p} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchingForm()}</div>
      <div className="container fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
