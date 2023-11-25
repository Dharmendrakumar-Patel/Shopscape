import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './redux/user/userSlice';
import productReducer from './redux/product/productSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = configureStore({
    reducer: persistedReducer,
    devTools: true,
});

let persistor = persistStore(store)

export  { store, persistor };