import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaRegHeart } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useBidOnProductMutation, useGetSingleProductQuery } from "../redux/api/productsApi";
import Loader from "../components/Loader";
import { calculateTimeDifference } from "../utils/function";
import { getUser } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const OneProduct = () => {
	const [product, setProduct] = useState();
	const [productOwner, setProductOwner] = useState();
	const [price, setPrice] = useState(product?.minPrice.toString() || "");
	const [description, setDescription] = useState("");
	const [openPopUp, setOpenPopUp] = useState(false);
	const { user } = useSelector((state) => state.userReducer);

	const [bidOnProduct, { data: bidData, isLoading, isSuccess, isError, error }] =
		useBidOnProductMutation();

	let currentUrl = window.location.href.split("/");
	let productId = currentUrl[currentUrl.length - 1];

	const { data, refetch } = useGetSingleProductQuery({ _id: productId });
	useEffect(() => {
		if (data && data.data) {
			setProduct(data.data.product);
			setProductOwner(data.data.owner);
		}
	}, [data]);

	const sendMessage = () => {
		setOpenPopUp(false);
	};
	const placeBid = async () => {
		try {
			const result = await bidOnProduct({
				productId: productId.toString(),
				userId: user._id.toString(),
				price: price.toString(),
				description,
			}).unwrap();
			refetch();
			setOpenPopUp(false);
			toast.success(result.message);
		} catch (error) {
			console.error("Error placing bid:", error);
			toast.error(error.data.message);
		}
	};

	const addToWishList = () => {};

	return !product ? (
		<Loader />
	) : (
		<div className="onProductPage">
			<Header />
			<main>
				<article className="first">
					<img src={product?.photos[0] || "/src/assets/noImage.jpg"} alt="product-image" />
					<section className="details">
						<p>RS {product.maxPrice}/-</p>
						<p className="abs">{calculateTimeDifference(product.createdAt)}</p>
						<FaRegHeart onClick={addToWishList} />
					</section>
					<section className="mainDetails">
						<div>
							<p>Model</p>
							<p>{product.model}</p>
						</div>
						<div>
							<p>Condition</p>
							<p>{product.condition}</p>
						</div>
						<div>
							<p>Min Price</p>
							<p>{product.minPrice}</p>
						</div>
						<div>
							<p>Max Price</p>
							<p>{product.maxPrice}</p>
						</div>

						<div>
							<p>Description</p>
							<p>{product.description}</p>
						</div>
					</section>
				</article>
				<article className="second">
					<section className="profile">
						<img
							src={productOwner.photo || "/src/assets/noProfile.jpg"}
							alt="newUser profile"
						/>
						<div className="userDetails">
							<h4>{productOwner.name}</h4>
							<p>{product.city}</p>
							<p>{productOwner.isVerified ? "Account Verified" : "NOt Verified"}</p>
							<div className="buttons">
								<button onClick={() => setOpenPopUp(!openPopUp)}>Bid Now</button>
								<button>
									<IoCall />
								</button>
							</div>
						</div>
					</section>
					<section className="bids">
						<div className="bidNowPopUp" style={{ display: openPopUp ? "flex" : "none" }}>
							<div className="inputs">
								<input
									type="text"
									placeholder="Enter price"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
								<textarea
									placeholder="Enter description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="buttons">
								<button onClick={sendMessage}>Send Message</button>
								<button onClick={placeBid}>Bid</button>
							</div>
						</div>
						{product.bids.length > 0 && (
							<>
								<h2>Bids on this post</h2>
								<div className="allBids">
									{product?.bids?.map((bid, i) => (
										<BidsComponent user={user} item={bid} key={i} />
									))}
								</div>
							</>
						)}
					</section>
				</article>
			</main>
		</div>
	);
};

export default OneProduct;

function BidsComponent({ item, user }) {
	const [newUser, setNewUser] = useState(false);
	// console.log("user", user);
	// console.log("item", item);
	useEffect(() => {
		(async () => {
			const data = await getUser(item.userId);
			setNewUser(data.data);
		})();
	}, [item]);
	return (
		<section className="bid">
			<div className="user">
				<img src={newUser?.photo || "/src/assets/noProfile.jpg"} alt="newUser profile" />
				<div>
					<p>{newUser.name}</p>
					<p>{calculateTimeDifference(item.createdAt)}</p>
				</div>
			</div>
			<div className="price">{item.userId == user._id && <h3>RS {item.price}/-</h3>}</div>
			<div className="description">
				<p>This is a sample description text regarding bidding section.</p>
			</div>
		</section>
	);
}
