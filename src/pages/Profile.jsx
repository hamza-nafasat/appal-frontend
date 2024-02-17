import React, { useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { LuLogOut } from "react-icons/lu";

const Profile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [dob, setDob] = useState("");
	const [sinceMember, setSinceMember] = useState("");
	const [verified, setVerified] = useState(false);
	const [primaryImg, setPrimaryImg] = useState("/src/assets/profile.png");
	const [secondaryImg, setSecondaryImg] = useState("/src/assets/noProfile.jpg");

	const handlePrimaryImageError = (error) => {
		if (error) setPrimaryImg(secondaryImg);
		else console.error("Error loading primary image:", error);
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
						<div>
							<button>
								<LuLogOut />
								Logout
							</button>
						</div>
					</section>
					<section className="details">
						<h2>Edit Profile</h2>
						<form>
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
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</p>
							<p className="number">
								<label>Number</label>
								<input
									type="number"
									value={number}
									onChange={(e) => setNumber(e.target.value)}
								/>
							</p>
							<p className="dob">
								<label>Dob</label>
								<input
									type="text"
									value={dob}
									onChange={(e) => setDob(e.target.value)}
								/>
							</p>
							<p className="memberSince">
								<label>Member Since</label>
								<input
									type="text"
									value={sinceMember}
									onChange={(e) => setSinceMember(e.target.value)}
								/>
							</p>
							<button type="submit">Save Changes</button>
						</form>
					</section>
				</article>
			</main>
		</div>
	);
};

export default Profile;
