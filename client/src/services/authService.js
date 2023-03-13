import axios from "axios";
import Cookies from "js-cookie"

const API_URL = "http://localhost:4000/api/auth";
const register = (username, email, password) => {
    return axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios.get(`${API_URL}/login?email=${email}&password=${password}`)
        .then((response) => {
            if (response.data.token) {
                const cookieObj = response.data
                Cookies.set("jwt", cookieObj.token, { expires: 7 })
                Cookies.set("username", cookieObj.username, { expires: 7 })
            }
            return response.data;
        });
};

const logout = () => {
    //--------------------
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;