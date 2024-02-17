import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CategoriesObj, cities } from "./txt";

const Header = () => {
	return (
		<header className="header">
			<NavBar />
			<Category />
		</header>
	);
};

export default Header;

function NavBar() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const handleClick = (item) => {
		setValue(item);
		setOpen(false);
	};
	useEffect(() => {
		console.log(value);
	}, [value]);

	return (
		<article className="navbar">
			<Link to={"/"} className="logo">
				<h3>Appal</h3>
			</Link>
			<div onClick={() => setOpen(!open)} className="cities">
				<IoLocationSharp className="loc" />
				<p>Location</p>

				<IoIosArrowDown className="arr" />
				<div className="popup" style={{ display: open ? "flex" : "none" }}>
					{cities.map((item, i) => (
						<p key={i} onClick={() => handleClick(item)}>
							<button>{item}</button>
						</p>
					))}
				</div>
			</div>
			<div className="searchBar">
				<IoIosSearch />
				<input
					type="search"
					id="search"
					name="search"
					placeholder="Search for products name"
				/>
			</div>
			<div className="buttons">
				<Link to={"/profile"}>
					<img src="https://avatars.githubusercontent.com/u/149063128?v=4" alt="user dp" />
				</Link>
				<Link className={"sell"} to={"/sell/product"}>
					sell
				</Link>
			</div>
		</article>
	);
}
function Category() {
	const [open, setOpen] = useState(false);
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
				<PopUp open={open} setOpen={setOpen} />
			</Link>
			<button className="msg">
				<MdMessage />
			</button>
		</article>
	);
}

function PopUp({ open, setOpen }) {
	const [value, setValue] = useState("");
	const handleClick = (item) => {
		setValue(item);
		setOpen(false);
	};
	useEffect(() => {
		console.log(value);
	}, [value]);

	return (
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
	);
}

function SectionOfPop({ name }) {
	return (
		<section key={i}>
			<h4>{name}</h4>
			{array.map((item, i) => (
				<button onClick={() => setValue(item)}>{item}</button>
			))}
		</section>
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
