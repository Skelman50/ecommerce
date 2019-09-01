import axios from "axios";
import { API } from "../config";

class ApiService {
  authApi = async (body, url) => {
    try {
      const { data } = await axios.post(`${API}/auth/${url}`, body);
      return data;
    } catch ({ response: { data } }) {
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
}

export const apiService = new ApiService();
