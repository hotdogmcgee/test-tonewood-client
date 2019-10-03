import config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  saveUserId(payload) {
    window.sessionStorage.setItem("user_id", payload.user_id);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  getUserId() {
    return window.sessionStorage.getItem("user_id");
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  clearUserId() {
    window.sessionStorage.removeItem("user_id");
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  }
};

export default TokenService;
