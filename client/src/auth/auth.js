import { apiService } from "../services/api-service";

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = async next => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    await apiService.signoutApi();
  }
};

export const isAuthenticate = () => {
  if (typeof window == undefined) {
    return false;
  }
  const token = localStorage.getItem("jwt");
  if (token) {
    return JSON.parse(token);
  } else {
    return false;
  }
};
