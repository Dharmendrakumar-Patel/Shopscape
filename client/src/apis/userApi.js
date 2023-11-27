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
        const response = await instance.delete('/user/logout',
            {
                params: { Shopscape: localStorage.getItem("Shopscape") }
            },
        );
        localStorage.removeItem("Shopscape");
        localStorage.removeItem("persist:root");
        return response;
    } catch (error) {
        errorHandler(error)
    }
}

export const getUser = async () => {
    try {
        const response = await instance.get('/user/',
            {
                params: { Shopscape: localStorage.getItem("Shopscape") }
            },
        )
        return response.data.user;
    } catch (error) {
        errorHandler(error)
    }
};

export const getAllUser = async () => {
    try {
        const response = await instance.get('/user/getAllUser',
            {
                params: { Shopscape: localStorage.getItem("Shopscape") }
            },
        );
        return response.data.users;
    } catch (error) {
        errorHandler(error);
    }
};

export const addProductToCart = async (payload) => {
    try {
        const response = await instance.put('/user/addProductToCart', payload,
            {
                params: { Shopscape: localStorage.getItem("Shopscape") }
            },
        );
        return response.data.cart;
    } catch (error) {
        errorHandler(error);
    }
};

export const removeUser = async (payload) => {
    try {
        const response = await instance.delete('/user/removeUser',
            {
                params: { Shopscape: localStorage.getItem("Shopscape") },
                id: payload,
            },
        );
        return response.data;
    } catch (error) {
        errorHandler(error);
    }
};

export const removeProductFromCart = async (payload) => {
    try {
        const response = await instance.delete('/user/removeProductFromCart',
            {
                data: payload,
            },
            {
                params: { Shopscape: localStorage.getItem("Shopscape") }
            },
        );
        return response.data.cart;
    } catch (error) {
        errorHandler(error);
    }
};
