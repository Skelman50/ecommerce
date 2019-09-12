import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { apiService } from "../services/api-service";
import Checkbox from "./Checkbox";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

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
  }, []);

  const handleFilters = (filters, filterBy) => {
    console.log(filters, filterBy);
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
            <Checkbox
              categories={categories}
              handleFilters={handleFilters}
            />
          </ul>
        </div>
        <div className="col-8">right</div>
      </div>
    </Layout>
  );
};

export default Shop;
