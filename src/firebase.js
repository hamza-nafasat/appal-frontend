import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCyCQjJGFRxSJjvc1eE4fH97qvFIbQPxY8",
	authDomain: "appal-project.firebaseapp.com",
	projectId: "appal-project",
	storageBucket: "appal-project.appspot.com",
	messagingSenderId: "489435931971",
	appId: "1:489435931971:web:af35e422822c5a01b47bf6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// apiKey: import.meta.env.API_KEY,
// authDomain: import.meta.env.AUTH_DOMAIN,
// projectId: import.meta.env.PROJECT_ID,
// storageBucket: import.meta.env.STORAGE_BUCKET,
// messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
// appId: import.meta.env.APP_ID,
