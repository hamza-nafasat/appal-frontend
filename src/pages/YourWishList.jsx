import React from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { OneAdd } from "./YourAdds";

const YourWishList = () => {
	return (
		<div className="yourAddsPage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="allAdds">
					<OneAdd wish={true} />
					<OneAdd wish={true} />
					<OneAdd wish={true} />
					<OneAdd wish={true} />
				</article>
			</main>
		</div>
	);
};

export default YourWishList;
