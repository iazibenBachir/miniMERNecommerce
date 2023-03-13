import axios from 'axios';
const API_URL = "http://localhost:4000/api";


export const getNewProducts = async () => {
    return axios.get(`${API_URL}/products`);

};
export const getProductDetails = async (id) => {
    return axios.get(`${API_URL}/products/${id}`);
};
export const getProductReviews = async (id) => {
    return axios.get(`${API_URL}/review/${id}`);
};

