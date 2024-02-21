import React, { useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/profileHeader";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUser, useEditProfileMutation } from "../redux/api/userApi";
import { userExist } from "../redux/reducers/userReducers";

const Profile = () => {
	const { user } = useSelector((state) => state.userReducer);

	const [name, setName] = useState(user?.name);
	const [primaryImg] = useState(user?.photo);
	const [email] = useState(user?.email);
	const [number] = useState(user?.number?.toString() || "");
	const [dob, setDob] = useState(user?.dob?.split("T")?.[0] || "");
	const [sinceMember] = useState(new Date(user?.createdAt).getFullYear());
	const [verified] = useState(user?.isVerified);

	const [updateUser] = useEditProfileMutation();

	const handelVErification = (e) => {
		e.preventDefault();
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (user) {
			updateUser({ name, dob, _id: user._id })
				.unwrap()
				.then((response) => {
					console.log(response);
					toast.success(response.message);
				})
				.catch((error) => {
					toast.error(error.data.message);
					console.log(error);
				});
		}
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
							src={primaryImg || "/src/assets/noProfile.jpg"}
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
								<button onClick={handelVErification}>Verified Your Account</button>
							)}
							<button type="submit" onClick={submitHandler}>
								Save Changes
							</button>
						</form>
					</section>
				</article>
			</main>
		</div>
	);
};

export default Profile;
