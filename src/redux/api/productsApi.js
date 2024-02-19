import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let serverUrl = "http://localhost:8000/api/v1";
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${serverUrl}/products/`,
	}),
	endpoints: (builder) => ({
		latestProduct: builder.query({ query: () => "" }),
	}),
});

export const { useLoginMutation } = productsApi;
