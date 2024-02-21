import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesObj } from "./txt";

const Header = ({ city, setCity, setModel, search, setSearch }) => {
	const { user } = useSelector((state) => state.userReducer);
	const navigate = useNavigate("");
	const urlParts = window.location.href.split("/");
	const lastSection = urlParts[urlParts.length - 1];

	return (
		<header className="header">
			<NavBar
				photo={user?.photo || ""}
				setCity={setCity}
				search={search}
				setSearch={setSearch}
				navigate={navigate}
				city={city}
				lastSection={lastSection}
			/>
			<Category lastSection={lastSection} navigate={navigate} setModel={setModel} />
		</header>
	);
};

export default Header;

function NavBar({ photo, city, setCity, search, setSearch, lastSection, navigate }) {
	const locationClickHandler = (e) => {
		setCity(e.target.value);
	};
	const navigateFunction = () => {
		if (lastSection != "products-all") {
			navigate("/products-all");
		}
	};
	return (
		<article className="navbar">
			<Link to={"/"} className="logo">
				<h3>Appal</h3>
			</Link>
			<div className="cities">
				<IoLocationSharp className="loc" />
				<input
					type="text"
					placeholder="Search by City"
					value={city}
					onChange={locationClickHandler}
					onFocus={navigateFunction}
				/>
			</div>
			<div className="searchBar">
				<IoIosSearch />
				<input
					type="search"
					id="search"
					name="search"
					placeholder="Search for products name"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={navigateFunction}
					autoFocus={lastSection == "products-all" ? true : false}
				/>
			</div>
			<div className="buttons">
				<Link to={"/profile"}>
					<img src={photo ? photo : "/src/assets/noProfile.jpg"} alt="user dp" />
				</Link>
				<Link className={"sell"} to={"/sell/product"}>
					sell
				</Link>
			</div>
		</article>
	);
}
function Category({ setModel, navigate, lastSection }) {
	const [open, setOpen] = useState(false);
	const handleClick = (item) => {
		setModel(item);
		setOpen(false);
	};
	const handleClickForDiv = () => {
		if (lastSection != "products-all") {
			navigate("/products-all");
		}
		console.log(lastSection);
		setOpen(!open);
	};
	return (
		<article className="categories">
			<Link to={""} className="list" onClick={handleClickForDiv}>
				<p>
					All Categories
					<IoIosArrowDown />
				</p>
				<p>Iphone</p>
				<p>Ipad</p>
				<p>Mackbook</p>
				<p>Watches</p>
				<p>Airpods</p>
				<p>Homepods</p>
				<div className="mainPopUp" style={{ display: open ? "flex" : "none" }}>
					<section>
						<h4>
							All Categories
							<IoIosArrowUp />
						</h4>
					</section>
					{Object.entries(CategoriesObj).map(([category, items]) => (
						<section key={category}>
							<h4>{category}</h4>
							{items.map((item, index) => (
								<button key={index} onClick={() => handleClick(item)}>
									{item}
								</button>
							))}
						</section>
					))}
				</div>
			</Link>
			<button className="msg">
				<MdMessage />
			</button>
		</article>
	);
}

// function MessagePopUp() {
// 	return (
// 		<section className="bid">
// 			<div className="user">
// 				<img src={"/src/assets/bidUser.png"} alt="user profile" />
// 				<div>
// 					<p>John Doe</p>
// 					<p>an hour ago</p>
// 				</div>
// 			</div>
// 			<div className="price">
// 				<h3>RS 400000/-</h3>
// 			</div>
// 			<div className="description">
// 				<p>This is a sample description text regarding bidding section.</p>
// 			</div>
// 		</section>
// 	);
// }
