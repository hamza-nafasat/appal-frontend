import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useCreateProductMutation } from "../redux/api/productsApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import { CategoriesObj, categories } from "../components/txt";

const SellProduct = () => {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("");

	const [condition, setCondition] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [status, setStatus] = useState("available");
	const [maxPrice, setMaxPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [modal, setModal] = useState("");
	const [selectedImages, setSelectedImages] = useState([]);
	const [showedImage, setShowedImage] = useState(null);
	// get user and create product
	const { user } = useSelector((state) => state.userReducer);
	const [createProduct] = useCreateProductMutation();
	// handler image change to set and show image
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setShowedImage(file);
			setSelectedImages((prevImages) => [...prevImages, file]);
		}
	};
	// form submit and create a product
	const submitHandlerForAll = () => {
		if (!user?.isVerified) return toast.error("Please Verify Your Account First");
		const countryName = Country.getCountryByCode(selectedCountry).name;
		const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry).name;
		const formData = new FormData();
		selectedImages.forEach((file) => formData.append("photos", file));
		formData.append("city", selectedCity);
		formData.append("address", `${selectedCity}, ${stateName}, ${countryName}`);
		formData.append("condition", condition);
		formData.append("minPrice", minPrice);
		formData.append("maxPrice", maxPrice);
		formData.append("description", description);
		formData.append("model", modal);
		formData.append("category", category);
		formData.append("status", status);
		createProduct({ formData, _id: user?._id })
			.unwrap()
			.then((response) => {
				toast.success(response.message);
				console.log("Product created successfully", response);
				formReset();
			})
			.catch((error) => {
				console.error("Error creating product:", error);
				toast.error(error.data.message);
			});
	};
	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		setModal("");
	};
	const handleCountryChange = async (countryCode) => {
		const statesData = await State.getStatesOfCountry(countryCode);
		setStates(statesData);
		setCities([]);
		setSelectedCountry(countryCode);
	};
	const handleStateChange = async (stateCode) => {
		const citiesData = await City.getCitiesOfState(selectedCountry, stateCode);
		console.log(citiesData);
		setCities(citiesData);
		setSelectedState(stateCode);
	};
	// useEffect for getting all countries when page loaded
	useEffect(() => {
		setCountries(Country.getAllCountries());
	}, []);
	const formReset = () => {
		setCategory("");
		setCondition("");
		setDescription("");
		setMaxPrice("");
		setMinPrice("");
		setModal("");
		setSelectedImages([]);
		setCities([]);
		setStates([]);
		setSelectedCity("");
		setSelectedCountry("");
		setSelectedState("");
		setShowedImage(null);
	};
	return (
		<div className="sellProductPage">
			<Header />
			<main>
				<article className="inputs">
					<h2>Sell Product</h2>
					<div>
						<p className="category half">
							<label htmlFor="category">Category</label>
							<select
								id="category"
								name="category"
								value={category}
								onChange={handleCategoryChange}
							>
								<option value="">category</option>
								{categories.map((category) => (
									<option key={category.toLowerCase()} value={category}>
										{category}
									</option>
								))}
							</select>
						</p>
						<p className="model half">
							<label htmlFor="model">Model</label>
							<select
								id="model"
								name="model"
								value={modal}
								onChange={(e) => setModal(e.target.value)}
							>
								<option value="">Choose a model</option>
								{category &&
									CategoriesObj[category].map((model, i) => (
										<option key={i} value={model.toLowerCase()}>
											{model}
										</option>
									))}
							</select>
						</p>
						<p className="country half">
							<label htmlFor="country">Country</label>
							<label htmlFor="country">Country</label>
							<select id="country" onChange={(e) => handleCountryChange(e.target.value)}>
								<option value="">Select Country</option>
								{countries.map((country) => (
									<option key={country.isoCode} value={country.isoCode}>
										{country.name}
									</option>
								))}
							</select>
						</p>
						<p className="state half">
							<label htmlFor="state">State</label>
							<select id="state" onChange={(e) => handleStateChange(e.target.value)}>
								<option value="">Select State</option>
								{states.map((state) => (
									<option key={state.isoCode} value={state.isoCode}>
										{state.name}
									</option>
								))}
							</select>
						</p>
						<p className="city full">
							<label htmlFor="city">City</label>
							<select id="city" onChange={(e) => setSelectedCity(e.target.value)}>
								<option value="">Select City</option>
								{cities.map((city) => (
									<option key={city.name} value={city.name}>
										{city.name}
									</option>
								))}
							</select>
						</p>
						<p className="condition full">
							<label htmlFor="condition">Condition</label>
							<select
								name="condition"
								id="condition"
								value={condition}
								onChange={(e) => setCondition(e.target.value)}
							>
								<option value="">Select Condition</option>
								<option value="new">New</option>
								<option value="used">Used</option>
								<option value="refurbished">Refurbished</option>
							</select>
						</p>
						<p className="status full">
							<label htmlFor="status">Status</label>
							<select
								name="status"
								id="status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="">Select Status</option>
								<option value="available">Available</option>
								<option value="paused">Paused</option>
								<option value="sold">Sold</option>
							</select>
						</p>
						<p className="minPrice half">
							<label htmlFor="minPrice">Min Price</label>
							<input
								type="address"
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
								type="address"
								name="maxPrice"
								id="maxPrice"
								value={maxPrice}
								placeholder="Max Price"
								onChange={(e) => setMaxPrice(e.target.value)}
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
					<h2>Upload Your Image</h2>
					<input
						style={{
							display: "none",
						}}
						type="file"
						id="image"
						accept="image/png, image/jpeg, image/webp, image/jpg"
						onChange={handleImageChange}
					/>
					<button
						onClick={() => document.getElementById("image").click()}
						style={{ alignSelf: "flex-start", padding: ".5rem 0", fontSize: "1rem" }}
					>
						Attach Files
					</button>
					{showedImage ? (
						<img
							src={URL.createObjectURL(showedImage)}
							alt="Preview"
							className="image-preview"
						/>
					) : (
						<img src={"/src/assets/noImage.jpg"} alt="Preview" className="image-preview" />
					)}
					<button type="submit" onClick={submitHandlerForAll}>
						Post Add
					</button>
				</article>
			</main>
		</div>
	);
};

export default SellProduct;
