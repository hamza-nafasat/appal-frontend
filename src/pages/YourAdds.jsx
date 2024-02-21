import React from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { useAllUserAddsQuery, useDeleteProductMutation } from "../redux/api/productsApi";
import { serverUrl } from "../redux/store";
import { calculateTimeDifference } from "../utils/function";

const YourAdds = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { data, refetch } = useAllUserAddsQuery({ userId: user._id });
	return (
		<div className="yourAddsPage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="allAdds">
					{data?.data?.map((product, i) => (
						<OneAdd refetch={refetch} key={i} product={product} />
					))}
				</article>
			</main>
		</div>
	);
};

export default YourAdds;

export function OneAdd({ wish, product, refetch }) {
	const [deleteProduct] = useDeleteProductMutation();
	const deleteHandler = (_id) => {
		deleteProduct({ _id })
			.unwrap()
			.then((response) => {
				toast.success(response.message);
				console.log("Product created successfully", response);
				refetch();
			})
			.catch((error) => {
				console.error("Error creating product:", error);
				toast.error(error.data.message);
			});
	};
	return (
		<section className="oneAdd">
			<Link to={`/product/${product?._id}`}>
				<img src={`${serverUrl}/${product?.photos?.[0]}`} alt={product?.name} />
			</Link>
			<div className="details">
				<div className="editDel" style={{ display: wish ? "none" : "flex" }}>
					<Link to={`/edit/product/${product?._id}`}>
						<FiEdit />
					</Link>
					<GoTrash onClick={() => deleteHandler(product?._id)} />
				</div>
				<p>RS {product?.maxPrice}/-</p>
				<p>{product?.model}</p>
				<p>{product?.city}</p>
				<p>{calculateTimeDifference(product?.createdAt)}</p>
			</div>
		</section>
	);
}
