import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAllCitiesQuery } from "../redux/api/productsApi";
import { CategoriesObj } from "./txt";

const Header = ({ city, setCity, setModel, search, setSearch }) => {
	const { user } = useSelector((state) => state.userReducer);
	const navigate = useNavigate("");

	return (
		<header className="header">
			<NavBar
				photo={user?.photo || ""}
				setCity={setCity}
				search={search}
				setSearch={setSearch}
				navigate={navigate}
				city={city}
			/>
			<Category navigate={navigate} setModel={setModel} />
		</header>
	);
};

export default Header;

function NavBar({ photo, city, setCity, search, setSearch, setModel }) {
	const [open, setOpen] = useState(false);
	const { data } = useAllCitiesQuery("");

	const modelClickHandler = (item) => {
		setCity(item);
		setOpen(false);
		navigate("/products/");
	};
	const locationClickHandler = () => {
		setOpen(!open);
	};
	return (
		<article className="navbar">
			<Link to={"/"} className="logo">
				<h3>Appal</h3>
			</Link>
			{/* <div onClick={locationClickHandler} className="cities">
				<IoLocationSharp className="loc" />
				<p>Location</p>
				<IoIosArrowDown className="arr" style={{ overflowY: "auto" }} />
				<div className="popup" style={{ display: open ? "flex" : "none" }}>
					{data?.data?.map((item, i) => (
						<p key={i} onClick={() => modelClickHandler(item)}>
							<button>{item}</button>
						</p>
					))}
				</div>
			</div> */}
			<div className="cities">
				<IoLocationSharp className="loc" />
				<input
					type="text"
					placeholder="Search by City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
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
function Category({ setModel }) {
	const [open, setOpen] = useState(false);
	const handleClick = (item) => {
		setModel(item);
		setOpen(false);
	};

	return (
		<article className="categories">
			<Link to={""} className="list" onClick={() => setOpen(!open)}>
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

// function SectionOfPop({ name }) {
// 	return (
// 		<section key={i}>
// 			<h4>{name}</h4>
// 			{array.map((item, i) => (
// 				<button key={i} onClick={() => setValue(item)}>
// 					{item}
// 				</button>
// 			))}
// 		</section>
// 	);
// }

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
