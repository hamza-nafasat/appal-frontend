import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "../utils/function";
import { getUser, useAddToWishListMutation } from "../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { serverUrl } from "../redux/store";
import { userExist } from "../redux/reducers/userReducers";

const FeaturedCard = ({ name, products, refetch }) => {
	const navigate = useNavigate();
	return (
		<article className="productsArticle">
			<header>
				<h2>{name}</h2>
				<button onClick={() => navigate("/products-all")}>See All</button>
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
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.userReducer);
	const [addToWishList, { data: msgData }] = useAddToWishListMutation();

	const addToWishListHandler = async () => {
		try {
			const msgData = await addToWishList({ productId: product._id, _id: user._id }).unwrap();
			toast.success(msgData.message);
			const data = await getUser(user?._id);
			dispatch(userExist(data.data));
			if (refetch) refetch();
		} catch (error) {
			console.error("Error placing bid:", error);
			toast.error(error.data.message);
		}
	};
	useEffect(() => {
		user.wishList.map((productId) => {
			if (productId == product._id) return setRed(true);
		});
	}, [msgData, user]);
	return (
		<section className="singleProduct">
			<Link to={`/product/${product._id}`}>
				<img
					src={`${serverUrl}/${product.photos[0]}` || "/src/assets/noImage.jpg"}
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
