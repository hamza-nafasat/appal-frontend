import React, { useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { LuLogOut } from "react-icons/lu";

const Profile = () => {
	const [primaryImg, setPrimaryImg] = useState("");
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
					<section>
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
					<section></section>
				</article>
			</main>
		</div>
	);
};

export default Profile;
