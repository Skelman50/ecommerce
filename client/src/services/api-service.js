import axios from "axios";
import queryString from "query-string";
import { API } from "../config";

class ApiService {
  authApi = async (body, url) => {
    try {
      const { data } = await axios.post(`${API}/auth/${url}`, body);
      return data;
    } catch ({ response: { data } }) {
      console.log(data);
      return data;
    }
  };

  signoutApi = async () => {
    try {
      const { data } = await axios.get(`${API}/auth/signout`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  addCategory = async (userId, token, category) => {
    try {
      const { data } = await axios.post(
        `${API}/categories/create/${userId}`,
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getFilteredProduct = async (skip, limit, filters = {}) => {
    try {
      const { data } = await axios.post(`${API}/products/by/search`, {
        skip,
        limit,
        filters
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getCategories = async () => {
    try {
      const {
        data: { categories }
      } = await axios.get(`${API}/categories`);
      return categories;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  listRelated = async id => {
    try {
      const { data } = await axios.get(`${API}/products/related/${id}`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  createProduct = async (userId, token, category) => {
    try {
      const { data } = await axios.post(
        `${API}/products/create/${userId}`,
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getProducts = async sortBy => {
    try {
      const { data } = await axios.get(
        `${API}/products?sortBy=${sortBy}&order=desc&limit=6`
      );
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  loadSingleProduct = async id => {
    try {
      const { data } = await axios.get(`${API}/products/once/${id}`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  searchList = async params => {
    try {
      const query = queryString.stringify(params);
      console.log(params);
      console.log("queryq", query);
      const { data } = await axios.get(`${API}/products/search?${query}`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };
}

export const apiService = new ApiService();
