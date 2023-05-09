import API from "../http";

class AuthService {
  static login({ email, password }) {
    return API.post("/auth/login", { email, password });
  }

  static register({ email, password }) {
    return API.post("/auth/register", { email, password });
  }
}

export default AuthService;
