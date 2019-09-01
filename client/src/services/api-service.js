import axios from "axios";
import { API } from "../config";

class ApiService {
  signUpService = async body => {
    try {
      const { data } = await axios.post(`${API}/auth/signup`, body);
      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  };
}

export const apiService = new ApiService();
