import React from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAllUserAddsQuery, useGetSingleProductQuery } from "../redux/api/productsApi";
import { useSelector } from "react-redux";
import { calculateTimeDifference } from "../utils/function";
import Loader from "../components/Loader";

const YourAdds = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { data } = useAllUserAddsQuery({ userId: user._id });
	console.log(data);
	return (
		<div className="yourAddsPage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="allAdds">
					{data?.data?.map((product, i) => (
						<OneAdd key={i} product={product} />
					))}
				</article>
			</main>
		</div>
	);
};

export default YourAdds;

export function OneAdd({ wish, product }) {
	return (
		<section className="oneAdd">
			<Link to={`/product/${product?._id}`}>
				<img src={product?.photos?.[0]} alt={product?.name} />
			</Link>
			<div className="details">
				<div className="editDel" style={{ display: wish ? "none" : "flex" }}>
					<Link to={"/edit/product"}>
						<FiEdit />
					</Link>
					<GoTrash />
				</div>
				<p>RS {product?.price}/-</p>
				<p>{product?.model}</p>
				<p>{product?.city}</p>
				<p>{calculateTimeDifference(product?.createdAt)}</p>
			</div>
		</section>
	);
}
