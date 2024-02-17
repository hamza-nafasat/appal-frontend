import React from "react";
import { FaGoogle } from "react-icons/fa";
import logo from "../assets/logo.png";

const Home = () => {
	return (
		<div className="loginPage">
			<section>
				<img src={logo} alt="Appal" />
				<h1>
					Welcome to <span>Appal</span>
				</h1>
				<p>The trusted community for buyers and sellers for apple products</p>
				<button>
					<FaGoogle />
					Continue with Google
				</button>
			</section>
		</div>
	);
};

export default Home;
