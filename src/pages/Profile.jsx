import React, { useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { LuLogOut } from "react-icons/lu";

const Profile = () => {
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("johndoe@gmail.com");
	const [number, setNumber] = useState("+92301599867");
	const [dob, setDob] = useState("23-11-2001");
	const [sinceMember, setSinceMember] = useState("2000");
	const [verified, setVerified] = useState(false);
	const [primaryImg, setPrimaryImg] = useState("/src/assets/profile.png");
	const [secondaryImg, setSecondaryImg] = useState("/src/assets/noProfile.jpg");

	const handlePrimaryImageError = (error) => {
		if (error) setPrimaryImg(secondaryImg);
		else console.error("Error loading primary image:", error);
	};
	const verifiedYourAcc = (e) => {
		e.preventDefault();
	};
	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
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
						<button>
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
							<p className="number">
								<label>Phone Number</label>
								<input type="text" value={number} disabled />
							</p>
							<p className="dob" style={{ marginRight: "auto" }}>
								<label>Dob</label>
								<input
									type="text"
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
								<button onClick={verifiedYourAcc}>Verified Your Account</button>
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
