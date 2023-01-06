import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/jwt/create";
const tokenkey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
   const { data: tokens } = await http.post(apiEndpoint, {
      username,
      password,
   });
   const { access: jwt } = tokens;
   sessionStorage.setItem(tokenkey, jwt);
}

export function loginWithJWT(jwt) {
   sessionStorage.setItem(tokenkey, jwt);
}

export function logout() {
   sessionStorage.removeItem(tokenkey);
}

export function getCurrentUser() {
   try {
      const jwt = sessionStorage.getItem(tokenkey);
      return jwtDecode(jwt);
   } catch (error) {
      return null;
   }
}

export function getJwt() {
   return sessionStorage.getItem(tokenkey);
}

const authService = {
   login,
   loginWithJWT,
   logout,
   getCurrentUser,
   getJwt,
};

export default authService;
