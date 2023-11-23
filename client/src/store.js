import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/user/userSlice';
import productReducer from './redux/product/productSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
    devTools: true,
});

export default store;