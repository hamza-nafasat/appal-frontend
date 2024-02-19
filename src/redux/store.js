import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducers/userReducers";

export let serverUrl = "http://localhost:8000/api/v1/";
export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[userReducer.name]: userReducer.reducer,
	},
	middleware: (defMid) => [...defMid(), userApi.middleware],
});
