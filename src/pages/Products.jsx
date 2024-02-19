import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SingleProduct } from "../components/FeaturedCard";
import { useSearchProductsQuery } from "../redux/api/productsApi";
import Loader from "../components/Loader";
import { useAddToWishListMutation } from "../redux/api/userApi";

const Products = () => {
	const currentUrl = window.location.href;
	const urlParts = currentUrl.split("/");
	const lastSection = urlParts[urlParts.length - 1];

	const [category, setCategory] = useState(lastSection);
	const [model, setModel] = useState("");
	const [search, setSearch] = useState("");
	const [city, setCity] = useState("");
	const { data, isLoading, refetch } = useSearchProductsQuery(
		{
			category,
			model,
			search,
			city,
		},
		{
			skip: false,
		}
	);

	useEffect(() => {
		refetch();
	}, [category, model, search, city]);
	return isLoading ? (
		<Loader />
	) : (
		<div className="productPage">
			<Header
				category={category}
				setCategory={setCategory}
				city={city}
				setCity={setCity}
				search={search}
				setModel={setModel}
				setSearch={setSearch}
				model={model}
			/>
			<main>
				<header>
					<h2>{lastSection}</h2>
				</header>
				<article>
					{!isLoading &&
						data.data.map((product, i) => (
							<SingleProduct refetch={refetch} key={i} product={product} />
						))}
				</article>
			</main>
		</div>
	);
};

export default Products;
