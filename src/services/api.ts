import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const getUsers = async (params: {
  limit: number;
  skip: number;
  select?: string;
  q?: string;
}) => {
  try {
    const response = await api.get('/users', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const searchUsers = async (query: string, params: { limit: number; skip: number }) => {
  try {
    const response = await api.get(`/users/search?q=${query}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

// Products API
export const getProducts = async (params: {
  limit: number;
  skip: number;
  select?: string;
}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (
  category: string,
  params: { limit: number; skip: number }
) => {
  try {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};

export const searchProducts = async (query: string, params: { limit: number; skip: number }) => {
  try {
    const response = await api.get(`/products/search?q=${query}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export default api;
