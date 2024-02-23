import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCCbMw2uaDeNjiYygMND2pbTLfAyDXzdDw",
	authDomain: "appal-fyp.firebaseapp.com",
	projectId: "appal-fyp",
	storageBucket: "appal-fyp.appspot.com",
	messagingSenderId: "515052592241",
	appId: "1:515052592241:web:d752229fd78f8b80c64fd0",
	measurementId: "G-74WEHNZ4EV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
