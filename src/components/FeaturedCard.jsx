import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import mobileImage from "../assets/mobile.png";
import { Link } from "react-router-dom";

const FeaturedCard = ({ name }) => {
	return (
		<article className="productsArticle">
			<header>
				<h2>{name}</h2>
				<Link to={`/products/${name}`}>See All</Link>
			</header>
			<main>
				<SingleProduct />
				<SingleProduct />
				<SingleProduct />
				<SingleProduct />
				<SingleProduct />
			</main>
		</article>
	);
};

export default FeaturedCard;

export function SingleProduct() {
	return (
		<section className="singleProduct">
			<Link to={"/product/_id"}>
				<img src={mobileImage} alt="" />
			</Link>
			<div className="details">
				<FaRegHeart />
				<p>RS 40000/-</p>
				<p>iphone 15 pro max</p>
				<p>Lahore</p>
				<p>2 days ago</p>
			</div>
		</section>
	);
}
