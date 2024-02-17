import React from "react";
import Header from "../components/Header";
import { SingleProduct } from "../components/FeaturedCard";

const Products = () => {
	const currentUrl = window.location.href;
	const urlParts = currentUrl.split("/");
	const lastSection = urlParts[urlParts.length - 1];
	return (
		<div className="productPage">
			<Header />
			<main>
				<header>
					<h2>{lastSection}</h2>
				</header>
				<article>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
						<SingleProduct />
					))}
				</article>
			</main>
		</div>
	);
};

export default Products;
