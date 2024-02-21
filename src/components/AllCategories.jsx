import React, { useState } from "react";
import watches from "../assets/icons/Group.png";
import airPods from "../assets/icons/air pods.png";
import homepods from "../assets/icons/homepod.png";
import iphone from "../assets/icons/iphone.png";
import mac from "../assets/icons/mac.png";
import tab from "../assets/icons/tab.png";

const AllCategories = ({ setCategory }) => {
	const handler = (val) => {
		setCategory(val);
	};
	return (
		<article className="homeCategories">
			{/* <h2>All Categories</h2> */}
			<section className="icons">
				<IconSection image={iphone} txt={"Iphone"} handler={handler} />
				<IconSection image={tab} txt={"Ipad"} handler={handler} />
				<IconSection image={mac} txt={"Mackbook"} handler={handler} />
				<IconSection image={airPods} txt={"Airpod"} handler={handler} />
				<IconSection image={watches} txt={"Watche"} handler={handler} />
				<IconSection image={homepods} txt={"Homepod"} handler={handler} />
			</section>
		</article>
	);
};

export default AllCategories;

function IconSection({ image, txt, handler }) {
	return (
		<section>
			<button onClick={() => handler(txt)}>
				<img src={image} alt={txt} />
			</button>
			<p>{txt}</p>
		</section>
	);
}
