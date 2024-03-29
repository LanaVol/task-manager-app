import API from "../http";

class AuthService {
  static login({ email, password }) {
    return API.post("/auth/login", { email, password });
  }

  static register({ userName, email, password }) {
    return API.post("/auth/register", { userName, email, password });
  }
  static async logout() {
    return API.get("/auth/logout");
  }

  static refresh() {
    return API.get("/auth/refresh", { withCredentials: true });
  }
}

export default AuthService;
