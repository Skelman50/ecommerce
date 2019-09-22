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
      const { data } = await axios.get(`${API}/products/search?${query}`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getBraintreeClientToken = async (userId, token) => {
    try {
      const { data } = await axios.get(`${API}/braintree/getToken/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  processPayment = async (userId, token, paymentData) => {
    try {
      const { data } = await axios.post(
        `${API}/braintree/payment/${userId}`,
        paymentData,
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

  createOrder = async (userId, token, order) => {
    try {
      const { data } = await axios.post(
        `${API}/order/create/${userId}`,
        { order },
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

  listOrders = async (userId, token) => {
    try {
      const { data } = await axios.get(`${API}/order/list/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getStatusValues = async (userId, token) => {
    try {
      const { data } = await axios.get(`${API}/order/status-values/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  updateStatus = async (userId, token, orderId, status) => {
    try {
      const { data } = await axios.put(
        `${API}/order/${orderId}/status/${userId}`,
        { status, orderId },
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

  getUserInfo = async (userId, token) => {
    try {
      const { data } = await axios.get(`${API}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  updateUserProfile = async (userId, token, user) => {
    try {
      const { data } = await axios.put(`${API}/user/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  updateUser = (user, next) => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("jwt")) {
        const auth = JSON.parse(localStorage.getItem("jwt"));
        auth.user = { ...user, role: auth.user.role };
        localStorage.setItem("jwt", JSON.stringify(auth));
        next();
      }
    }
  };

  getPurchase = async (userId, token) => {
    try {
      const { data } = await axios.get(`${API}/user/ordersByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getAdminProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/products`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  getSingleProduct = async productId => {
    try {
      const { data } = await axios.get(`${API}/products/once/${productId}`);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };

  deleteProduct = async (userId, productId, token) => {
    try {
      const { data } = await axios.delete(
        `${API}/products/${productId}/${userId}`,
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

  updateProduct = async (userId, productId, token, product) => {
    try {
      const { data } = await axios.put(
        `${API}/products/${productId}/${userId}`,
        product,
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
