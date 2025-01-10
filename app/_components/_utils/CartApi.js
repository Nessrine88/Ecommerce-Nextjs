import axios from 'axios';
import { default as axiosClient } from './axiosClient'; // Assuming axiosClient is correctly configured
import qs from 'qs';

// Function to generate query parameters based on the email
const getQueryParams = (email) => {
  return {
    populate: {
      products: {
        populate: '*',
      },
    },
    filters: {
      email: {
        $eq: email,
      },
    },
  };
};

// Add to cart function
const addToCart = (payload) => axiosClient.post('/carts', payload);

// Get user cart items function
const getUserCartItems = (email) => {
  // Generate query parameters
  const queryParams = getQueryParams(email);
  
  // Convert queryParams into a query string using qs.stringify
  const queryString = qs.stringify(queryParams, { encode: false });

  // Make the GET request with the query string
  return axiosClient.get(`/carts?${queryString}`);
};
const deleteCartItem = (documentId)=> axiosClient.delete(`/carts/${documentId} `)
export default {
  addToCart,
  getUserCartItems,
  deleteCartItem
};
