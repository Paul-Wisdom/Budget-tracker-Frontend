import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = "/api/";

const signUp = (user) => {
  const url = baseUrl + "signup";
  return axios.post(url, user);
};

const signIn = (user) => {
  const url = baseUrl + "signin";
  return axios.post(url, user);
};

const isLoggedIn = () => {
  const url = baseUrl + "auth";
  return axios.post(url);
};

const signOut = () => {
  const url = baseUrl + "signout";
  return axios.post(url);
};

const changePassword = (email, newPassword) => {
  const url = baseUrl + "change-password";
  return axios.post(url, { email: email, newPassword: newPassword });
};
export default {
  signUp,
  signIn,
  isLoggedIn,
  signOut,
  changePassword,
};
