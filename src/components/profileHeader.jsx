import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const profileHeader = () => {
	return (
		<article className="profileHeader">
			<LinkComponent
				url={"/profile"}
				title={"Profile"}
				svg={<CgProfile fontSize={"2.2rem"} />}
			/>
			<LinkComponent
				url={"/profile/adds"}
				title={"Your Adds"}
				svg={<FaRegHeart fontSize={"1.8rem"} />}
			/>
			<LinkComponent url={"/profile/wishlist"} title={"Your WishList"} svg={<IoHeart />} />
		</article>
	);
};

export default profileHeader;

function LinkComponent({ url, title, svg }) {
	const urlParts = window.location.href.split("/");
	const lastSection = urlParts[urlParts.length - 1];
	const newUrlParts = url.split("/");
	const myUrl = newUrlParts[newUrlParts.length - 1];
	return (
		<Link
			to={url}
			style={{
				color: lastSection == myUrl ? "#0089cd" : "#666666",
			}}
		>
			{svg}
			<h3>{title}</h3>
		</Link>
	);
}
