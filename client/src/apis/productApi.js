import axios from 'axios';
import errorHandler from '../utils/errorHandler';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

export const getAllProduct = async (payload) => {
    try {
        const response = await instance.get('/product/getAllProducts', payload);
        return response.data.sortedProducts;
    } catch (error) {
        errorHandler(error);
    }
};

export const addProduct = async (payload) => {
    try {
        await instance.post('/product/addProduct', payload);
    } catch (error) {
        errorHandler(error);
    }
};

export const updateProduct = async (id,payload) => {
    try {
        const response = await instance.put(
            '/product/updateProduct',
            payload,
            {
                params: { id }
            },
        );
        return response.data.products;
    } catch (error) {
        errorHandler(error);
    }
};

export const removeProduct = async (id) => {
    try {
        const response = await instance.delete(
            '/product/removeProduct',
            {
                params: { id }
            },
        );
        return response.data.products;
    } catch (error) {
        errorHandler(error);
    }
}