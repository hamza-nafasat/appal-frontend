import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesObj } from "./txt";
import { TiTick } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import {
	getFirestore,
	addDoc,
	collection,
	serverTimestamp,
	query,
	orderBy,
	getDocs,
	updateDoc,
	getDoc,
	doc,
	setDoc,
	where,
} from "firebase/firestore";
import { app } from "../firebase";
import { getUser } from "../redux/api/userApi";
import { calculateTimeDifference } from "../utils/function";
import { CgSpinner } from "react-icons/cg";

const Header = ({
	city,
	setCity,
	setModel,
	search,
	setSearch,
	bidOwnerId = "",
	openInnerMsgF = false,
	setOpenInnerMsgF,
	setBidOwnerId,
}) => {
	const [message, setMessage] = useState("");
	const [allMessages, setAllMessages] = useState([]);
	const [allConversations, setAllConversations] = useState([]);
	const [open, setOpen] = useState(false);
	const [openMsg, setOpenMsg] = useState(false);
	const [innerMsg, setInnerMsg] = useState(false);
	const [msgLoading, setMsgLoading] = useState(false);
	const [msgSent, setMsgSent] = useState(false);

	const { user } = useSelector((state) => state.userReducer);

	const [conversationId, setConversationId] = useState(`${user?._id}_${bidOwnerId}`);

	const popupRef = useRef(null);

	const navigate = useNavigate("");
	const urlParts = window.location.href.split("/");
	const lastSection = urlParts[urlParts.length - 1];

	const db = getFirestore(app);
	const collectionName = "conversations";
	const innerCollection = "messages";

	const fetchMessagesForConversation = async (conversationId) => {
		try {
			const messagesRef = collection(db, collectionName, conversationId, innerCollection);
			const q = query(messagesRef, orderBy("timestamp", "desc"));
			const querySnapshot = await getDocs(q);
			const messages = [];
			querySnapshot.forEach((doc) => {
				messages.push({ id: doc.id, ...doc.data() });
			});
			return messages;
		} catch (error) {
			console.error("Error fetching messages for conversation:", error);
			return [];
		}
	};
	console.log(allMessages, "messages");
	const getOtherUserIdFromConversationId = (conversationId, currentUserId) => {
		const [userId1, userId2] = conversationId.split("_");
		if (userId1 !== currentUserId) return userId1;
		else return userId2;
	};
	const locationClickHandler = (e) => {
		setCity(e.target.value);
	};
	const navigateFunction = () => {
		if (lastSection != "products-all") {
			navigate("/products-all");
		}
	};
	const handelClickForModelSet = (item) => {
		setModel(item);
		setOpen(false);
	};
	const handelClickForModelPopUP = () => {
		if (lastSection != "products-all") {
			navigate("/products-all");
		}
		console.log(lastSection);
		setOpen(!open);
	};
	const openMsg1Handler = () => {
		if (setOpenInnerMsgF) setOpenInnerMsgF(false);
		setOpenMsg(!openMsg);
	};
	const openMsg2Handler = async (conversationId) => {
		setOpenMsg(false);
		setInnerMsg(true);
	};
	// ==========================
	// ==========================
	const messageSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			if (!message) return;
			setMsgLoading(true);
			if (!conversationId) {
				throw new Error("Missing user or recipient ID");
			}
			const conversationRef = doc(db, collectionName, conversationId);
			const existingConversationSnapshot = await getDoc(conversationRef);
			if (!existingConversationSnapshot.exists()) {
				await setDoc(conversationRef, {
					members: [user._id, bidOwnerId],
					lastMessage: message,
					timestamp: serverTimestamp(),
				});
			}
			// Update conversation's `lastMessage` and `timestamp`:
			await updateDoc(conversationRef, {
				lastMessage: message,
				timestamp: serverTimestamp(),
			});
			// Add the message to the conversation's inner `messages` collection:
			await addDoc(collection(conversationRef, innerCollection), {
				senderId: user._id,
				text: message,
				timestamp: serverTimestamp(),
			});
			setMsgLoading(false);
			setMessage("");
			setMsgSent(!msgSent);
		} catch (error) {
			console.error("Error while adding message:", error);
			setMsgLoading(false);
		}
	};

	useEffect(() => {
		fetchMessagesForConversation(conversationId).then((result) => {
			setAllMessages(result);
		});
		if (message.senderId) {
			setBidOwnerId(message.senderId);
		}
	}, [msgSent, conversationId]);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				setAllConversations([]);
				if (!user?._id) throw new Error("Missing user ID");
				const conversationsRef = collection(db, collectionName);
				const q = query(conversationsRef, where("members", "array-contains", user?._id));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach(async (doc) => {
					const conversationId = doc.id;
					const senderId = getOtherUserIdFromConversationId(conversationId, user?._d);
					const { data } = await getUser(senderId);
					// const messages = await fetchMessagesForConversation(conversationId);
					const conversationData = { ...doc.data(), sender: data, conversationId };
					setAllConversations((pre) => [...pre, conversationData]);
				});
			} catch (error) {
				console.error("Error fetching conversations:", error);
			}
		};
		fetchConversations();
	}, [user]);

	// making the popup hide when any body click outside the popup
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				setInnerMsg(false);
				if (setOpenInnerMsgF) setOpenInnerMsgF(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	return (
		<header className="header">
			<article className="navbar">
				<Link to={"/"} className="logo">
					<h3>Appal</h3>
				</Link>
				<div className="cities">
					<IoLocationSharp className="loc" />
					<input
						type="text"
						placeholder="Search by City"
						value={city}
						onChange={locationClickHandler}
						onFocus={navigateFunction}
					/>
				</div>
				<div className="searchBar">
					<IoIosSearch />
					<input
						type="search"
						id="search"
						name="search"
						placeholder="Search for products name"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onFocus={navigateFunction}
						autoFocus={lastSection == "products-all" ? true : false}
					/>
				</div>
				<div className="buttons">
					<Link to={"/profile"}>
						<img
							src={user?.photo ? user?.photo || "" : "/src/assets/noProfile.jpg"}
							alt="user dp"
						/>
					</Link>
					<Link className={"sell"} to={"/sell/product"}>
						sell
					</Link>
				</div>
			</article>
			<article className="categories">
				<Link
					to={""}
					className="list"
					onFocus={navigateFunction}
					onClick={handelClickForModelPopUP}
				>
					<p>
						All Categories
						<IoIosArrowDown />
					</p>
					<p>Iphone</p>
					<p>Ipad</p>
					<p>Mackbook</p>
					<p>Watch</p>
					<p>Airpod</p>
					<p>Homepod</p>
					<div className="mainPopUp" style={{ display: open ? "flex" : "none" }}>
						<section>
							<h4>
								All Categories
								<IoIosArrowUp />
							</h4>
						</section>
						{Object.entries(CategoriesObj).map(([category, items]) => (
							<section key={category}>
								<h4>{category}</h4>
								{items.map((item, index) => (
									<button key={index} onClick={() => handelClickForModelSet(item)}>
										{item}
									</button>
								))}
							</section>
						))}
					</div>
				</Link>
				<button className="msg" onClick={openMsg1Handler}>
					<MdMessage />
				</button>
			</article>
			<article className="msgPopUp" style={{ display: openMsg ? "flex" : "none" }}>
				{/* <section className="searchSection">
					<div className="search">
						<IoSearchSharp />
						<input type="text" />
					</div>
					<div className="btn">
						<button>
							<FaPlus />
						</button>
					</div>
				</section> */}
				<section className="messages">
					{allConversations.map((item, i) => (
						<OneMsgPoster
							key={i}
							url={item.sender.photo}
							handler={openMsg2Handler}
							text={item.lastMessage}
							name={item.sender.name}
							time={item.timestamp.seconds}
							item={item}
						/>
					))}
				</section>
			</article>
			<article
				className="msgPopUp"
				ref={popupRef}
				style={{ display: innerMsg || openInnerMsgF ? "flex" : "none", padding: "0 1rem" }}
			>
				<article className="messagesMain">
					<section className="userDetailSection">
						<div className="img">
							<img src={user?.photo || "/src/assets/noProfile.jpg.jpg"} alt="user" />
						</div>
						<h3>Hamza</h3>
					</section>
					<section className="allMessages">
						{allMessages.map((item, i) => (
							<OneInnerMsg
								key={i}
								text={item.text}
								sender={user?._id == item.senderId}
								conversation={item}
							/>
						))}
					</section>
					<section className="sendMsg">
						<input
							type="text"
							value={message}
							required
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button onClick={messageSubmitHandler}>
							{msgLoading && <CgSpinner size={20} className="spinner" />}Send
						</button>
					</section>
				</article>
			</article>
		</header>
	);
};

function OneMsgPoster({ text, name, time, url, handler, item }) {
	return (
		<section className="OneMsg" onClick={() => handler(item.conversationId)}>
			<div className="img">
				<img src={url || "/src/assets/noProfile.jpg"} alt="user Profile" />
			</div>
			<div className="details">
				<h3>{name}</h3>
				<p>{text}</p>
			</div>
			<div className="time">
				<p>{calculateTimeDifference(new Date(time * 1000))}</p>
				<TiTick />
			</div>
		</section>
	);
}
function OneInnerMsg({ text, sender }) {
	return (
		<section className="singleMessageSenderOrUser">
			<div style={{ alignSelf: !sender ? "flex-start" : "flex-end" }}>
				<p>{text}</p>
			</div>
		</section>
	);
}

export default Header;
