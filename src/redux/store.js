import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducers/userReducers";
import { productsApi } from "./api/productsApi";

export const serverUrl = "http://localhost:8000";
export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[userReducer.name]: userReducer.reducer,
	},
	middleware: (defMid) => [...defMid(), userApi.middleware, productsApi.middleware],
});
