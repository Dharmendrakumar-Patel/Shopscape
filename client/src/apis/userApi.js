import axios from 'axios';
import errorHandler from '../utils/errorHandler';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

export const signUp = async (payload) => {
    try {
        const response = await instance.post('/user/signup', payload);
        localStorage.setItem("Shopscape", response.data.token);
        return response.data.user;
    } catch (error) {
        errorHandler(error);
    }
}

export const signIn = async (payload) => {
    try {
        const response = await instance.post('/user/signin', payload)
        localStorage.setItem("Shopscape", response.data.token)
        return response.data.user;
    } catch (error) {
        errorHandler(error)
    }
}

export const logOut = async () => {
    try {
        const response = await instance.delete('/user/logout');
        localStorage.removeItem("Shopscape");
        return response;
    } catch (error) {
        errorHandler(error)
    }
}

export const getUser = async () => {
    try {
        const response = await instance.get('/user/')
        return response.data.user;
    } catch (error) {
        errorHandler(error)
    }
};


export const addProductToCart = async (payload) => {
    try {
        const response = await instance.put('/user/addProductToCart', payload);
        return response.data.cart;
    } catch (error) {
        errorHandler(error);
    }
};

export const removeProductFromCart = async (payload) => {
    console.log(Object.fromEntries(payload))
    try {
        const response = await instance.delete('/user/removeProductFromCart', {
            data: payload,
        });
        return response.data.cart;
    } catch (error) {
        errorHandler(error);
    }
};
