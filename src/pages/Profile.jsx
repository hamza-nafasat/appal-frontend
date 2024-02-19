import React, { useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Profile = () => {
	const { user } = useSelector((state) => state.userReducer);

	const [name, setName] = useState(user.name);
	const [primaryImg, setPrimaryImg] = useState(user.photo);
	const [email] = useState(user.email);
	const [number] = useState(user.number ? String(user.number) : "");
	const [dob, setDob] = useState(String(user.dob) && "");
	const [sinceMember] = useState(new Date(user.createdAt).getFullYear());
	const [verified] = useState(user.isVerified);
	const [secondaryImg] = useState("/src/assets/noProfile.jpg");

	const handlePrimaryImageError = (error) => {
		if (error) setPrimaryImg(secondaryImg);
		else console.error("Error loading primary image:", error);
	};

	const handleSendCode = () => {};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(dob);
	};
	const logoutHandler = async () => {
		try {
			await signOut(auth);
			toast.success("Logout Successfully");
		} catch (error) {
			toast.error("Logout Failed");
			console.log("Logout Error", error);
		}
	};
	return !user ? (
		<Loader />
	) : (
		<div className="profilePage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="update">
					<section className="img">
						<img
							src={primaryImg}
							alt="userProfile"
							onError={(error) => handlePrimaryImageError(error)}
						/>
						<button onClick={logoutHandler}>
							<LuLogOut />
							Logout
						</button>
					</section>
					<section className="details">
						<h2>Edit Profile</h2>
						<form onSubmit={submitHandler}>
							<p className="name">
								<label>Name</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</p>
							<p className="email">
								<label>Email</label>
								<input type="email" value={email} disabled />
							</p>
							{number && (
								<p className="number">
									<label>Phone Number</label>
									<input type="text" value={number} disabled />
								</p>
							)}
							<p className="dob" style={{ marginRight: "auto" }}>
								<label>Dob</label>
								<input
									type="date"
									value={dob}
									onChange={(e) => setDob(e.target.value)}
								/>
							</p>
							<p className="memberSince ">
								<label>Member Since</label>
								<input type="text" value={sinceMember} disabled />
							</p>
							{verified ? (
								<p className="accountVerified ">
									<label>Account Verified</label>
									<input type="text" value={"Account Verified"} disabled />
								</p>
							) : (
								<button onClick={handleSendCode}>Verified Your Account</button>
							)}
							<button type="submit">Save Changes</button>
						</form>
					</section>
				</article>
			</main>
		</div>
	);
};

export default Profile;
