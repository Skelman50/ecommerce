import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { apiService } from "../services/api-service";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import Card from "./Card";
import { prices } from "../services/fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: []
    }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);

  const init = async () => {
    const response = await apiService.getCategories();
    if (response.error) {
      return setError(response.error);
    }
    setError(false);
    setCategories(response);
  };

  useEffect(() => {
    init();
    loadFiltersResult(skip, limit, myFilters.filters);
  }, []);

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) array = data[key].array;
    }
    return array;
  };

  const loadFiltersResult = async newFilters => {
    const response = await apiService.getFilteredProduct(
      skip,
      limit,
      newFilters
    );
    if (response.error) {
      return setError(response.error);
    }
    setFilteredResult(response.products);
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      const priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFiltersResult(myFilters.filters);
    setMyFilters(newFilters);
  };

  return (
    <Layout
      title="Shop page"
      description="Search and find books"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h2>Filter by categories</h2>
          <ul>
            <Checkbox categories={categories} handleFilters={handleFilters} />
          </ul>
          <h2>Filter by prices</h2>
          <div>
            <RadioBox prices={prices} handleFilters={handleFilters} />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResult.map((item, idx) => (
              <Card product={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
