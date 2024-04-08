import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi.js";
import { userReducer } from "./reducer/userReducer.js";
import { cartReducer } from "./reducer/cartReducer.js";
import { productAPI } from "./api/productAPI.js";
import { orderAPI } from "./api/orderAPI.js";
import { dashboardAPI } from "./api/dashboardAPI.js";
import { addressAPI } from "./api/addressAPI.js";
import { wishlistAPI } from "./api/wishlistAPI.js";


export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [addressAPI.reducerPath]: addressAPI.reducer,
        [wishlistAPI.reducerPath]: wishlistAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
        
    },
    middleware: (mid) => [...mid(), userAPI.middleware, productAPI.middleware, orderAPI.middleware, addressAPI.middleware, wishlistAPI.middleware],
});