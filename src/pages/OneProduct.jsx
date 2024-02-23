import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaRegHeart } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useBidOnProductMutation, useGetSingleProductQuery } from "../redux/api/productsApi";
import Loader from "../components/Loader";
import { calculateTimeDifference } from "../utils/function";
import { getUser, useAddToWishListMutation } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { serverUrl } from "../redux/store";
import { MdMessage } from "react-icons/md";

const OneProduct = () => {
	const [red, setRed] = useState(false);
	const [product, setProduct] = useState();
	const [productOwner, setProductOwner] = useState();
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [openPopUp, setOpenPopUp] = useState(false);

	const [bidOwnerId, setBidOwnerId] = useState("");
	const [openInnerMsgF, setOpenInnerMsgF] = useState(false);

	const { user } = useSelector((state) => state.userReducer);
	const [addToWishList, { data: msgData }] = useAddToWishListMutation();
	const [bidOnProduct] = useBidOnProductMutation();

	let currentUrl = window.location.href.split("/");
	let productId = currentUrl[currentUrl.length - 1];
	const { data, refetch } = useGetSingleProductQuery({ _id: productId });
	useEffect(() => {
		if (data && data.data) {
			setProduct(data.data.product);
			setProductOwner(data.data.owner);
			setBidOwnerId("");
		}
		refetch();
	}, [data]);
	const placeBid = async () => {
		try {
			if (!user?.isVerified) return toast.error("Please Verify Your Account First");
			if (price < product?.minPrice) {
				return toast.error(`We recommend raising your amount to ${product?.minPrice}`);
			}
			if (product?.ownerId == user?._id) {
				return toast.error("You are owner sir");
			}
			const result = await bidOnProduct({
				productId: productId?.toString(),
				userId: user?._id.toString(),
				price: price?.toString(),
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
	useEffect(() => {
		user.wishList.map((productId) => {
			if (productId == product?._id) return setRed(true);
			refetch().unwrap();
		});
	}, [msgData, product]);
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

	return !product ? (
		<Loader />
	) : (
		<div className="onProductPage">
			<Header
				bidOwnerId={bidOwnerId}
				openInnerMsgF={openInnerMsgF}
				setOpenInnerMsgF={setOpenInnerMsgF}
				setBidOwnerId={setBidOwnerId}
			/>
			<main>
				<article className="first">
					<img
						src={`${serverUrl}/${product?.photos[0]}` || "/src/assets/noImage.jpg"}
						alt="product-image"
					/>
					<section className="details">
						<p>RS {product.maxPrice}/-</p>
						<p className="abs">{calculateTimeDifference(product.createdAt)}</p>
						<FaRegHeart onClick={addToWishListHandler} color={red ? "#FF0000" : ""} />
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
							<p style={{ width: "100%" }}>Price</p>
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
							src={productOwner?.photo || "/src/assets/noProfile.jpg"}
							alt="newUser profile"
						/>
						<div className="userDetails">
							<h4>{productOwner?.name}</h4>
							<p>{product?.city}</p>
							<p>{productOwner?.isVerified ? "Account Verified" : "NOt Verified"}</p>
							<div className="buttons">
								<button onClick={() => setOpenPopUp(!openPopUp)}>Bid Now</button>
								<button>
									<a href={`tel:${productOwner?.phoneNumber}`}>
										<IoCall color="#ffffff" />
									</a>
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
								<button style={{ width: "100%" }} onClick={placeBid}>
									Bid
								</button>
							</div>
						</div>
						{product.bids.length > 0 && (
							<>
								<h2>Bids on this post</h2>
								<div className="allBids">
									{product?.bids?.map((bid, i) => (
										<BidsComponent
											user={user}
											item={bid}
											key={i}
											productOwnerId={product?.ownerId}
											setBidOwnerId={setBidOwnerId}
											setOpenInnerMsgF={setOpenInnerMsgF}
										/>
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

function BidsComponent({ item, user, productOwnerId, setBidOwnerId, setOpenInnerMsgF }) {
	const [newUser, setNewUser] = useState(false);

	const bidMsgHandler = () => {
		if (productOwnerId !== user?._id) {
			toast.error("You Are Not Owner");
		} else {
			setBidOwnerId(item?.userId);
			if (setOpenInnerMsgF) setOpenInnerMsgF(true);
		}
	};

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
					<p>{newUser?.name}</p>
					<p>{calculateTimeDifference(item?.createdAt)}</p>
				</div>
			</div>
			<div className="price">{item?.userId == user?._id && <h3>RS {item?.price}/-</h3>}</div>
			<div className="description">
				<p>{item?.description}</p>
			</div>
			<button onClick={bidMsgHandler}>
				<MdMessage />
			</button>
		</section>
	);
}
