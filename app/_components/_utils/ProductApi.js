const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = () => axiosClient.get('/products?populate=*');
const getProductById = (documentId) => axiosClient.get(`/products/${documentId}?populate=*`)
const getProductByCategory = (category) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

export default {
    getLatestProducts,
    getProductById,
    getProductByCategory
};
