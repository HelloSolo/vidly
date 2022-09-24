import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = `${config.apiEndpoint}/auth`;
const tokenkey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
   const { data: jwt } = await http.post(apiEndpoint, { email, password });
   localStorage.setItem(tokenkey, jwt);
}

export function loginWithJWT(jwt) {
   localStorage.setItem(tokenkey, jwt);
}

export function logout() {
   localStorage.removeItem(tokenkey);
}

export function getCurrentUser() {
   try {
      const jwt = localStorage.getItem(tokenkey);
      return jwtDecode(jwt);
   } catch (error) {
      return null;
   }
}

export function getJwt() {
   return localStorage.getItem(tokenkey);
}

const authService = { login, loginWithJWT, logout, getCurrentUser, getJwt };
export default authService;
