import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "useforum-760d5.firebaseapp.com",
	databaseURL: "https://useforum-760d5-default-rtdb.firebaseio.com",
	projectId: "useforum-760d5",
	storageBucket: "useforum-760d5.appspot.com",
	messagingSenderId: "218709807386",
	appId: "1:218709807386:web:4f81bfbfed86b869a35ca3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getDatabase();
