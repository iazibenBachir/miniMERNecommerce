import axios from "axios";
import Cookies from "js-cookie";
const API_URL = "http://localhost:4000/api";
const jwt = Cookies.get("jwt")
const getProductDetails = async (id) => {
    return axios.get(`${API_URL}/products/${id}`).then((response) => {
        return response.data
    })
}
const getProductReviews = async (id) => {
    return axios.get(`${API_URL}/review/${id}`).then((response) => {
        return response.data
    })
}
const postReview = async (formData) => {
    console.log(jwt)

    return axios({
        method: "POST",
        url: `${API_URL}/review/`,
        data: formData,
        headers: {
            Authorization: "Bearer " + jwt,
        },
    }).then((response) => {
        console.log(response.data)
        return response.data
    })
}

const currentProd = {
    getProductDetails,
    getProductReviews,
    postReview
}
export default currentProd;