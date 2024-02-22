import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDEkBCncHo_4_I8BfAE76xUTbkxvS72te8",
	authDomain: "appal-project-2.firebaseapp.com",
	projectId: "appal-project-2",
	storageBucket: "appal-project-2.appspot.com",
	messagingSenderId: "601846074287",
	appId: "1:601846074287:web:6688eb0d3f2b22e9947d5a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// apiKey: "AIzaSyCyCQjJGFRxSJjvc1eE4fH97qvFIbQPxY8",
// authDomain: "appal-project.firebaseapp.com",
// projectId: "appal-project",
// storageBucket: "appal-project.appspot.com",
// messagingSenderId: "489435931971",
// appId: "1:489435931971:web:af35e422822c5a01b47bf6",

// apiKey: import.meta.env.API_KEY,
// authDomain: import.meta.env.AUTH_DOMAIN,
// projectId: import.meta.env.PROJECT_ID,
// storageBucket: import.meta.env.STORAGE_BUCKET,
// messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
// appId: import.meta.env.APP_ID,
