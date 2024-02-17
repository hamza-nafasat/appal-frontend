import React from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

const YourAdds = () => {
	return (
		<div className="yourAddsPage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="allAdds">
					<OneAdd />
					<OneAdd />
					<OneAdd />
					<OneAdd />
					<OneAdd />
					<OneAdd />
					<OneAdd />
					<OneAdd />
					<OneAdd />
				</article>
			</main>
		</div>
	);
};

export default YourAdds;

export function OneAdd({ wish }) {
	return (
		<section className="oneAdd">
			<Link to={"/product/_id"}>
				<img src={"/src/assets/mobile.png"} alt="" />
			</Link>
			<div className="details">
				<div className="editDel" style={{ display: wish ? "none" : "flex" }}>
					<Link to={"/edit/product"}>
						<FiEdit />
					</Link>
					<GoTrash />
				</div>
				<p>RS 40000/-</p>
				<p>iphone 15 pro max</p>
				<p>Lahore</p>
				<p>2 days ago</p>
			</div>
		</section>
	);
}
