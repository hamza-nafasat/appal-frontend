import React, { useState } from "react";
import watches from "../assets/icons/Group.png";
import airPods from "../assets/icons/air pods.png";
import homepods from "../assets/icons/homepod.png";
import iphone from "../assets/icons/iphone.png";
import mac from "../assets/icons/mac.png";
import tab from "../assets/icons/tab.png";

const AllCategories = () => {
	const [category, setCategory] = useState("");
	const handler = (val) => {
		setCategory(val);
		console.log(category);
	};
	return (
		<article className="homeCategories">
			<h2>All Categories</h2>
			<section className="icons">
				<IconSection image={iphone} txt={"Iphone"} handler={handler} />
				<IconSection image={tab} txt={"Ipads"} handler={handler} />
				<IconSection image={mac} txt={"Mackbook"} handler={handler} />
				<IconSection image={airPods} txt={"Airpods"} handler={handler} />
				<IconSection image={watches} txt={"Watches"} handler={handler} />
				<IconSection image={homepods} txt={"Homepods"} handler={handler} />
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
