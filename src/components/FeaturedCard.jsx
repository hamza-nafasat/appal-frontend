import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { calculateTimeDifference } from "../utils/function";
import { useAddToWishListMutation } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const FeaturedCard = ({ name, products, refetch }) => {
	return (
		<article className="productsArticle">
			<header>
				<h2>{name}</h2>
				<Link to={`/products/${name}`}>See All</Link>
			</header>
			<main>
				{products.map((product, i) => (
					<SingleProduct refetch={refetch} key={i} product={product} />
				))}
			</main>
		</article>
	);
};

export default FeaturedCard;

export function SingleProduct({ product, refetch }) {
	const [red, setRed] = useState(false);

	const { user } = useSelector((state) => state.userReducer);

	const [addToWishList, { data: msgData }] = useAddToWishListMutation();

	useEffect(() => {
		user.wishList.map((productId) => {
			if (productId == product._id) return setRed(true);
		});
	}, [msgData]);

	const addToWishListHandler = async () => {
		try {
			const msgData = await addToWishList({ productId: product._id, _id: user._id }).unwrap();
			toast.success(msgData.message);
			if (refetch) {
				refetch();
			}
		} catch (error) {
			console.error("Error placing bid:", error);
			toast.error(error.data.message);
		}
	};
	return (
		<section className="singleProduct">
			<Link to={`/product/${product._id}`}>
				<img
					// `${serverUrl}/${product.photos[0]}`
					src={`${product.photos[0]}` || "/src/assets/noImage.jpg"}
					alt={`${product.name}`}
				/>
			</Link>
			<div className="details">
				<FaRegHeart onClick={addToWishListHandler} color={red ? "#FF0000" : ""} />
				<p>RS {product.maxPrice}/-</p>
				<p>{product.model}</p>
				<p style={{ fontSize: "0.9rem" }}>{product.city}</p>
				<p>{calculateTimeDifference(product.createdAt)}</p>
			</div>
		</section>
	);
}
