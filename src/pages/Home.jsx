import React, { useState } from "react";
import Header from "../components/Header";
// import AllCategory from "../components/AllCategory";
import iphone from "../assets/icons/iphone.png";
import tab from "../assets/icons/tab.png";
import mac from "../assets/icons/mac.png";
import airPods from "../assets/icons/air pods.png";
import homepods from "../assets/icons/homepod.png";
import watches from "../assets/icons/Group.png";
import { Link } from "react-router-dom";
import mobileImage from "../assets/mobile.png";
import { FaRegHeart } from "react-icons/fa6";
import FeaturedCard from "../components/FeaturedCard";
import AllCategories from "../components/AllCategories";

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
