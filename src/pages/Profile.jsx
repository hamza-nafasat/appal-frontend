import { signOut, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ProfileHeader from "../components/profileHeader";
import { auth } from "../firebase";
import { useEditProfileMutation, useVerifyPhoneNumberMutation } from "../redux/api/userApi";

const Profile = () => {
	const { user } = useSelector((state) => state.userReducer);

	const primaryImg = user?.photo;
	const email = user?.email;
	const number = user?.number?.toString() || "";
	const sinceMember = new Date(user?.createdAt).getFullYear();
	const verified = user?.isVerified;

	const [name, setName] = useState(user?.name);
	const [dob, setDob] = useState(user?.dob?.split("T")?.[0] || "");
	const [otp, setOtp] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [openPop, setOpenPop] = useState(false);
	const [showOtp, setShowOtp] = useState(false);
	const [loading, setLoading] = useState(false);
	const [poneVeri] = useVerifyPhoneNumberMutation();
	const [updateUser] = useEditProfileMutation();

	const handelVErification = (e) => {
		e.preventDefault();
		setOpenPop(!openPop);
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
	const setupRecaptcha = () => {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
				size: "invisible",
				callback: (response) => {
					console.log("Recaptcha verified", response);
				},
			});
		}
	};
	const otpGeneratingFunc = async () => {
		try {
			setLoading(true);
			setupRecaptcha();
			const appVerifier = window.recaptchaVerifier;
			const confirmationResult = await signInWithPhoneNumber(
				auth,
				`+${phoneNumber}`,
				appVerifier
			);
			window.confirmationResult = confirmationResult;
			setShowOtp(true);
			setLoading(false);
			toast.success("OTP Send Successfully");
		} catch (error) {
			console.log("Error during generating otp", error);
			setLoading(false);
		}
	};

	const otpVerificationHandler = () => {
		setLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (response) => {
				toast.success(data.message);
				const data = await poneVeri({ number: `+${phoneNumber}`, _id: user?._id });
				console.log(data);
				setLoading(false);
				console.log(response);
				setOpenPop(false);
				toast.success("Please Login Again Once Due To Security Purpose");
			})
			.catch((error) => {
				console.log("error while otp verification", error);
				toast.error("Please Enter a Correct OTP");
				setLoading(false);
			});
	};

	return !user ? (
		<Loader />
	) : (
		<div className="profilePage">
			<Header />
			<main>
				<ProfileHeader />
				<article className="update">
					<div className="otpPopUp" style={{ display: openPop ? "flex" : "none" }}>
						{showOtp ? (
							<>
								<div className="icon">
									<BsFillShieldLockFill />
								</div>
								<div className="input">
									<label htmlFor="number">Enter Your OTP</label>
									<OtpInput
										value={otp}
										onChange={setOtp}
										shouldAutoFocus
										numInputs={6}
										renderSeparator={<span>-</span>}
										renderInput={(props) => <input {...props} />}
										inputStyle={{ width: "3rem", height: "3rem", outline: "none" }}
									/>
									<button onClick={otpVerificationHandler}>
										{loading && <CgSpinner size={20} className="spinner" />}
										Verify OTP
									</button>
								</div>
							</>
						) : (
							<>
								<div className="icon">
									<BsTelephoneFill />
								</div>
								<div id="recaptcha-container"></div>
								<div className="input">
									<label htmlFor="number">Enter Your OTP</label>
									<PhoneInput
										country={"pk"}
										value={phoneNumber}
										onChange={setPhoneNumber}
									/>
									<button onClick={otpGeneratingFunc}>
										{loading && <CgSpinner size={20} className="spinner" />}
										Send OTP via sm
									</button>
								</div>
							</>
						)}
					</div>
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
