import React from "react";
import { FaGoogle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useLoginMutation } from "../redux/api/userApi";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [login] = useLoginMutation();
	const navigate = useNavigate();

	const loginFunc = async () => {
		try {
			const authProvider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, authProvider);
			const user = result.user;
			const res = await login({
				_id: user.uid,
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
			});
			if (res.data) {
				navigate("/");
				toast.success(res.data.message);
			} else {
				toast.error(res.error.data.message);
			}
		} catch (err) {
			console.log(err);
			toast.error("Sign In Fail");
		}
	};

	return (
		<div className="loginPage">
			<section>
				<img src={logo} alt="Appal" />
				<h1>
					Welcome to <span>Appal</span>
				</h1>
				<p>The trusted community for buyers and sellers for apple products</p>
				<button onClick={loginFunc}>
					<FaGoogle />
					Continue with Google
				</button>
			</section>
		</div>
	);
};

export default Login;
