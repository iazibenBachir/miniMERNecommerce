import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const getProducts = async (queryURL) => {
    return axios.get(`${API_URL}/products?${queryURL}`).then((response) => {
        return response.data
    })
}
export const searchProducts = async (query) => {
    return axios.get(`${API_URL}/products/search?${query}`).then((response) => {
        return response.data
    })
}
