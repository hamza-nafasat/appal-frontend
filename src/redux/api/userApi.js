import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
// import { serverUrl } from "../store";

let serverUrl = "http://localhost:8000/api/v1";
export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl}/users/` }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (user) => ({
				url: "new",
				method: "POST",
				body: user,
			}),
		}),
	}),
});

export const getUser = async (_id) => {
	try {
		const { data } = await axios.get(`${serverUrl}/users/profile`, {
			params: { _id },
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const { useLoginMutation } = userApi;
