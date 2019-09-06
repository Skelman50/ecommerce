import axios from "axios";
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
}

export const apiService = new ApiService();
