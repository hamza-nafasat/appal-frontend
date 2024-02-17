import { useState } from "react";
import Header from "../components/Header";

const categories = ["iphone", "ipad", "airpod", "mackbook", "watche", "homepod"];
const CategoriesObj = {
	iphone: [
		"iPhone 15 Pro Max",
		"iPhone 15 Pro",
		"iPhone 15 Plus",
		"iPhone 15",
		"iPhone 14 Pro Max",
		"iPhone 14 Pro",
		"iPhone 14 Plus",
		"iPhone 14",
		"iPhone 13 Pro Max",
		"iPhone 13 Pro",
		"iPhone 13 mini",
		"iPhone 13",
		"iPhone 12 Pro Max",
		"iPhone 12 Pro",
		"iPhone 12 mini",
		"iPhone 12",
		"iPhone SE ",
		"iPhone 11 Pro Max",
		"iPhone 11 Pro",
		"iPhone 11",
		"iPhone XR",
		"iPhone XS Max",
		"iPhone XS",
		"iPhone X",
		"iPhone 8 Plus",
		"iPhone 8",
		"iPhone 7 Plus",
		"iPhone 7",
		"iPhone 6S Plus",
		"iPhone 6S",
		"iPhone 6 Plus",
		"iPhone 6",
	],
	ipad: ["AirPods Gen1", "AirPods Gen2", "AirPods Gen3", "AirPods Pro", "AirPods Max"],
	airpod: ["AirPods Gen1", "AirPods Gen2", "AirPods Gen3", "AirPods Pro", "AirPods Max"],
	mackbook: [
		"MacBook Pro 14-inch (M2 Pro)",
		"MacBook Pro 14-inch (M2 Max)",
		"MacBook Pro 16-inch (M2 Pro)",
		"MacBook Pro 16-inch (M2 Max)",
		"MacBook Air (M2)",
		"MacBook Pro 13-inch (M1, 2020)",
		"MacBook Air (M1, 2020)",
		"MacBook Pro 16-inch (Intel, 2019)",
		"MacBook Pro 13-inch (Intel, 2019)",
		"MacBook Air (Intel, 2018)",
		"MacBook 12-inch (Intel, 2017)",
	],
	watche: [
		"Apple Watch Series 8 (GPS)",
		"Apple Watch Series 8 (Cellular)",
		"Apple Watch Series 8 Nike",
		"Apple Watch Series 8 (Hermes)",
		"Apple Watch SE (GPS)",
		"Apple Watch SE (Cellular)",
		"Apple Watch Series 7 (2021)",
		"Apple Watch Series 6 (2020)",
		"Apple Watch SE (2020)",
		"Apple Watch Series 5 (2019)",
		"Apple Watch Series 4 (2018)",
		"Apple Watch Series 3 (2017)",
	],
	homepod: ["HomePod mini", "HomePod"],
};

const EditProduct = () => {
	const [location, setLocation] = useState("Lahore");
	const [number, setNumber] = useState("+923462468395");
	const [condition, setCondition] = useState("New");
	const [minPrice, setMinPrice] = useState("23000");
	const [maxPrice, setMaxPrice] = useState("50000");
	const [description, setDescription] = useState("sample");
	const [category, setCategory] = useState("iphone");
	const [modal, setModal] = useState("iphone-13");
	const [selectedImages, setSelectedImages] = useState([]);
	const [showedImage, setShowedImage] = useState("/src/assets/mobile.png");

	const handleImageChange = (event) => {
		setShowedImage(event.target.files[0]);
		if (showedImage) {
			setShowedImage(event.target.files[0]);
			const fileReader = new FileReader();
			fileReader.onload = () => {
				setSelectedImages((prevImages) => [...prevImages, fileReader.result]);
			};
			fileReader.readAsDataURL(event.target.files[0]);
		}
	};
	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
		setModal("");
	};
	const handleModelChange = (event) => {
		setModal(event.target.value);
	};
	const submitHandlerForAll = () => {
		const formData = new FormData();
		selectedImages.map((file) => formData.append("photos", file));
		console.log(
			location,
			number,
			condition,
			minPrice,
			maxPrice,
			description,
			modal,
			category,
			selectedImages
		);
		setSelectedImages([]);
	};
	const attachFileHandler = () => {
		const fileInput = document.getElementById("image");
		fileInput.click();
		setShowedImage(null);
	};
	return (
		<div className="editProductPage">
			<Header />
			<main>
				<article className="inputs">
					<h2>Edit Product</h2>
					<div>
						<p className="category half">
							<label htmlFor="category">Category</label>
							<select
								id="category"
								name="category"
								value={category}
								onChange={handleCategoryChange}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</p>
						<p className="location half">
							<label htmlFor="location">Location</label>
							<input
								type="text"
								name="location"
								id="location"
								placeholder="Enter Your Location"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							/>
						</p>
						<p className="condition full">
							<label htmlFor="condition">Condition</label>
							<select
								name="condition"
								id="condition"
								value={condition}
								onChange={(e) => setCondition(e.target.value)}
							>
								<option value="new">New</option>
								<option value="used">Used</option>
								<option value="refurbish">Refurbish</option>
							</select>
						</p>
						<p className="model full">
							<label htmlFor="model">Model</label>
							<select id="model" name="model" value={modal} onChange={handleModelChange}>
								{category &&
									CategoriesObj[category].map((model) => (
										<option key={model} value={model}>
											{model}
										</option>
									))}
							</select>
						</p>
						<p className="minPrice half">
							<label htmlFor="minPrice">Min Price</label>
							<input
								type="number"
								name="minPrice"
								id="minPrice"
								placeholder="Min Price"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
							/>
						</p>
						<p className="maxPrice half">
							<label htmlFor="maxPrice">Max Price</label>
							<input
								type="number"
								name="maxPrice"
								id="maxPrice"
								value={maxPrice}
								placeholder="Max Price"
								onChange={(e) => setMaxPrice(e.target.value)}
							/>
						</p>
						<p className="number full">
							<label htmlFor="number">Contact Number</label>
							<input
								type="text"
								name="number"
								id="number"
								value={number}
								placeholder="Enter you number"
								onChange={(e) => setNumber(e.target.value)}
							/>
						</p>
						<p className="description full">
							<label htmlFor="description">Description</label>
							<textarea
								name="description"
								id="description"
								rows="5"
								placeholder="Write a description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</p>
					</div>
				</article>
				<article className="imageUpload">
					<h2>Upload New Images</h2>
					<input
						style={{
							display: "none",
						}}
						type="file"
						id="image"
						accept="image/png, image/jpeg, image/webp"
						onChange={handleImageChange}
					/>
					<button
						onClick={attachFileHandler}
						style={{ alignSelf: "flex-start", padding: ".5rem 0", fontSize: "1rem" }}
					>
						Attach Files
					</button>
					{showedImage ? (
						<img src={showedImage} alt="Preview" className="image-preview" />
					) : (
						<img src={"/src/assets/noimage.jpg"} alt="Preview" className="image-preview" />
					)}
					<button type="submit" onClick={submitHandlerForAll}>
						Save Changes
					</button>
				</article>
			</main>
		</div>
	);
};

export default EditProduct;