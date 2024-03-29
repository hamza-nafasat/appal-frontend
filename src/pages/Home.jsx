import { useEffect, useState } from "react";
import Header from "../components/Header";
import AllCategories from "../components/AllCategories";
import FeaturedCard from "../components/FeaturedCard";
import { useLatestProductQuery } from "../redux/api/productsApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Home = () => {
	// getting data from backend
	const { data, isError, isLoading, refetch } = useLatestProductQuery();
	if (isError) {
		toast.error("Error During Fetching Data From Server");
	}
	useEffect(() => {
		refetch();
	}, []);
	return isLoading ? (
		<Loader />
	) : (
		<div className="homePage">
			<Header />
			<main>
				<section className="featureSection">
					{data &&
						Object.entries(data.data).map(([categoryName, products], i) => (
							<FeaturedCard
								refetch={refetch}
								key={i}
								products={products}
								name={categoryName}
							/>
						))}
				</section>
			</main>
		</div>
	);
};

export default Home;
