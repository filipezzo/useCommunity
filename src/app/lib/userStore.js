import { create } from "zustand";
import { api } from "../utils/api";

export const useUserStore = create((set) => ({
	currentUser: null,
	isLoading: false,
	fetchUser: async (uid) => {
		set({ isLoading: true });
		if (!uid) {
			return set({ currentUser: null, isLoading: false });
		}

		try {
			const { data, status } = await api.get(`/users/${uid}.json`);
			if (status !== 200) {
				return set({ currentUser: null });
			}
			set({ currentUser: data });
		} catch (error) {
			console.error(error.message);
			return set({ currentUser: null });
		} finally {
			set({ isLoading: false });
		}
	},
}));
