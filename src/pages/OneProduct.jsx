import React, { useState } from "react";
import Header from "../components/Header";
import mobile from "../assets/mobile.png";
import { FaRegHeart } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const OneProduct = () => {
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [openPopUp, setOpenPopUp] = useState(false);

	const handlePriceChange = (e) => {
		setPrice(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const sendMessage = () => {
		// Logic to send message
		console.log("Message sent:", { price, description });
		setOpenPopUp(false);
	};

	const placeBid = () => {
		// Logic to place bid
		console.log("Bid placed:", { price, description });
		setOpenPopUp(false);
	};
	const bidNowHandler = () => {
		setOpenPopUp(!openPopUp);
	};
	return (
		<div className="onProductPage">
			<Header />
			<main>
				<article className="first">
					<img src={mobile} alt="product-image" />
					<section className="details">
						<p>RS 400000/-</p>
						<p className="abs">a week ago</p>
						<FaRegHeart />
					</section>
					<section className="mainDetails">
						<div>
							<p>Model</p>
							<p>Iphone 15 pro</p>
						</div>
						<div>
							<p>Condition</p>
							<p>New</p>
						</div>
						<div>
							<p>Number</p>
							<p>03060000000</p>
						</div>
						<div>
							<p>Description</p>
							<p>This is my mobile and i want to sell it now.</p>
						</div>
					</section>
				</article>
				<article className="second">
					<section className="profile">
						<img src={"/src/assets/profile.png"} alt="user profile" />
						<div className="userDetails">
							<h4>John Doe</h4>
							<p>Lahore</p>
							<p>Account Verified</p>
							<div className="buttons">
								<button onClick={bidNowHandler}>Bid Now</button>
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
									onChange={handlePriceChange}
								/>
								<textarea
									placeholder="Enter description"
									value={description}
									onChange={handleDescriptionChange}
								/>
							</div>
							<div className="buttons">
								<button onClick={sendMessage}>Send Message</button>
								<button onClick={placeBid}>Bid</button>
							</div>
						</div>

						<h2>Bids on this post</h2>
						<div className="allBids">
							<BidsComponent />
							<BidsComponent />
							<BidsComponent />
							<BidsComponent />
							<BidsComponent />
							<BidsComponent />
						</div>
					</section>
				</article>
			</main>
		</div>
	);
};

export default OneProduct;

function BidsComponent() {
	return (
		<section className="bid">
			<div className="user">
				<img src={"/src/assets/bidUser.png"} alt="user profile" />
				<div>
					<p>John Doe</p>
					<p>an hour ago</p>
				</div>
			</div>
			<div className="price">
				<h3>RS 400000/-</h3>
			</div>
			<div className="description">
				<p>This is a sample description text regarding bidding section.</p>
			</div>
		</section>
	);
}
