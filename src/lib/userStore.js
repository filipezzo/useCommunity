import { create } from "zustand";
import { api } from "../utils/api";

export const useUserStore = create((set) => ({
	currentUser: null,
	fetchUser: async (uid) => {
		if (!uid) return set({ currentUser: null });

		try {
			const response = await api.get(`/users/${uid}.json`);
			if (response.status !== 200) {
				return set({ currentUser: null });
			}
			set({ currentUser: response.data });
		} catch (error) {
			console.error(error.message);
			return set({ currentUser: null });
		}
	},
}));
