import React, { useState } from "react";
import Header from "../components/Header";
import AllCategories from "../components/AllCategories";
import FeaturedCard from "../components/FeaturedCard";

const Home = () => {
	const [category, setCategory] = useState("");
	const handler = (val) => {
		setCategory(val);
		console.log(category);
	};
	return (
		<div className="homePage">
			<Header />
			<main>
				<AllCategories />
				<section className="featureSection">
					<FeaturedCard name={"Iphones"} />
					<FeaturedCard name={"Macbooks"} />
					<FeaturedCard name={"Ipads"} />
					<FeaturedCard name={"Airpods"} />
					<FeaturedCard name={"Watches"} />
					<FeaturedCard name={"Homepods"} />
				</section>
			</main>
		</div>
	);
};

export default Home;
