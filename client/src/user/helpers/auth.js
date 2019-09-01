import { apiService } from "../../services/api-service";

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
    const response = await apiService.signoutApi();
    console.log(response);
  }
};
