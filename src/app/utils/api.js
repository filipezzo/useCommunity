import axios from "axios";

export const api = axios.create({
	baseURL: "https://useforum-760d5-default-rtdb.firebaseio.com",
});
