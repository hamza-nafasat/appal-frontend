import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SingleProduct } from "../components/FeaturedCard";
import { useSearchProductsQuery } from "../redux/api/productsApi";
import Loader from "../components/Loader";
import AllCategories from "../components/AllCategories";

const ProductsAll = () => {
	const [category, setCategory] = useState("");
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
				city={city}
				setCity={setCity}
				search={search}
				setModel={setModel}
				setSearch={setSearch}
				model={model}
			/>
			<main>
				<AllCategories category={category} setCategory={setCategory} />
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

export default ProductsAll;
