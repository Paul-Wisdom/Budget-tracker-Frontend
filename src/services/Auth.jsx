import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = "http://localhost:3001/api/";

const signUp = (user) => {
    const url = baseUrl + 'signup'
    return axios.post(url, user);
}

const signIn = (user) => {
    const url = baseUrl + 'signin';
    return axios.post(url, user);
}

const isLoggedIn = () => {
    const url = baseUrl + 'auth';
    return axios.post(url);
}

const signOut = () => {
    const url = baseUrl + 'signout';
    return axios.post(url)
}
export default {
    signUp,
    signIn,
    isLoggedIn,
    signOut
}