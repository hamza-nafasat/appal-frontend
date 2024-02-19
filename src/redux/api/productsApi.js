import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let serverUrl = "http://localhost:8000/api/v1";
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${serverUrl}/products/`,
	}),
	endpoints: (builder) => ({
		latestProduct: builder.query({ query: () => "latest" }),
		////
		searchProducts: builder.query({
			query: ({ category, model, search, city }) => ({
				url: "search-products",
				params: { category, model, search, city },
			}),
		}),
		////
		getSingleProduct: builder.query({
			query: ({ _id }) => ({
				url: `${_id}`,
			}),
		}),
		////
		bidOnProduct: builder.mutation({
			query: ({ productId, userId, price, description }) => ({
				url: `bids/${productId}?userId=${userId}`,
				method: "PUT",
				body: {
					price,
					description,
				},
			}),
		}),
		////
		allCities: builder.query({
			query: () => "cities",
		}),
		////
		allUserAdds: builder.query({
			query: ({ userId }) => ({ url: `my-products?userId=${userId}` }),
		}),
		////
		getWishList: builder.query({
			query: ({ wishlists }) => ({
				url: "/wishlist",
				method: "POST",
				body: { wishlists },
			}),
		}),
		////
		createProduct: builder.mutation({
			query: ({ formData, _id }) => ({
				url: `/create?_id=${_id}`,
				method: "POST",
				body: formData,
			}),
		}),
		////
		deleteProduct: builder.mutation({
			query: ({ _id }) => ({ url: `$_id}` }),
		}),
	}),
});

export const {
	useLatestProductQuery,
	useSearchProductsQuery,
	useGetSingleProductQuery,
	useBidOnProductMutation,
	useAllCitiesQuery,
	useAllUserAddsQuery,
	useGetWishListQuery,
	useCreateProductMutation,
} = productsApi;
