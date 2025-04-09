import { create } from "zustand";
import {
	MarketplaceStoreType,
	MarketplaceData,
	CartStoreType,
} from "./types/marketplace-types";

export const useMarketplaceStore = create<MarketplaceStoreType>((set) => ({
	marketplaceItems: [],
	likedItems: [],
	inCartItems: [],

	updateInCartItems: (targetID, item) => {
		set((state) => {
			const isAdded = state.inCartItems.some((item) => item.id === targetID);

			let updateInCartItems = state.inCartItems;
			const updatedMarketplaceItems = state.marketplaceItems.map(
				(marketItem) => {
					if (marketItem.id === targetID) {
						return { ...marketItem, isAdded: !marketItem.isAdded };
					}

					return marketItem;
				}
			);

			if (!isAdded) {
				updateInCartItems = [...state.inCartItems, item];
			} else {
				updateInCartItems = state.inCartItems.filter(
					(item) => item.id !== targetID
				);
			}

			return {
				...state,
				marketplaceItems: updatedMarketplaceItems,
				inCartItems: updateInCartItems,
			};
		});
	},

	updatedLikedItems: (targetID, item) =>
		set((state) => {
			const isLiked = state.likedItems.some((item) => item.id === targetID);

			let updatedLikedItems = state.likedItems;
			const updatedMarketplaceItems = state.marketplaceItems.map(
				(marketItem) => {
					if (marketItem.id === targetID) {
						return { ...marketItem, isLiked: !marketItem.isLiked };
					}
					return marketItem;
				}
			);

			if (!isLiked) {
				updatedLikedItems = [...state.likedItems, item];
			} else {
				updatedLikedItems = state.likedItems.filter(
					(item) => item.id !== targetID
				);
			}

			return {
				...state,
				likedItems: updatedLikedItems,
				marketplaceItems: updatedMarketplaceItems,
			};
		}),

	updateMarketplace: async () => {
		const response = await fetch("/server/marketplaceDB.json");
		const data: MarketplaceData = await response.json();
		const initialization = data.storageItems.map((item) => {
			return {
				...item,
				isLiked: false,
				isAdded: false,
			};
		});
		set({ marketplaceItems: initialization });
	},
}));


export const useCartStore = create<CartStoreType>((set) => ({
	isCartOpen: false,
	isCartSuccess: false,

	updateIsCartOpen: ()=> {
		set((state) => {
			return {...state, isCartOpen: !state.isCartOpen}
		})
	},

	updateisCartSuccess: ()=> {
		set((state)=> {
			return {...state, isCartSuccess: !state.isCartSuccess}
		})
	}
}))