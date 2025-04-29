import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
	LikedItemStore,
	MarketplaceStoreType,
	UserStoreType,
	CartItemSotreType,
} from "./types/store-types";
import { fetchTool } from "./tools";

export const useMarketplaceStore = create<MarketplaceStoreType>((set) => ({
	maketplaceItems: [],
	searchedItems: [],

	updateMarketplaceItems: async () => {
		try {
			const response = await fetchTool();

			set({
				maketplaceItems: response,
			});
		} catch (error) {
			console.error(error);
		}
	},

	updateSearchedItems: (searchValue) => {
		set((state) => {
			const marketplaceFilter = state.maketplaceItems.filter((item) => {
				return item.itemName.toLowerCase().includes(searchValue);
			});
			return {
				...state,
				searchedItems: marketplaceFilter,
			};
		});
	},
}));

export const useLikedItemStore = create<LikedItemStore>((set) => ({
	likedItems: [],

	updateLikedItems: async (userInfo) => {
		try {
			const response = await fetchTool();

			set(() => {
				const filterLikedItems = response.filter((marketplaceItem) =>
					userInfo?.some((item) => item === marketplaceItem.id)
				);

				return {
					likedItems: filterLikedItems,
				};
			});
		} catch (error) {
			console.error(error);
		}
	},
}));

export const useInCartItemStore = create<CartItemSotreType>()(
	persist(
		(set) => ({
			inCartItems: [],
			isCartOpen: false,
			isCartSuccess: false,

			updateInCartItems: async (userInfo) => {
				console.log(userInfo);
				try {
					const response = await fetchTool();
					set(() => {
						const filterInCartItems = response.filter((marketplaceItem) =>
							userInfo?.some((inCartItem) => inCartItem === marketplaceItem.id)
						);

						return {
							inCartItems: filterInCartItems,
						};
					});
				} catch (error) {
					console.error(error);
				}
			},

			updateIsCartOpen: () => {
				set((state) => {
					return {
						...state,
						isCartOpen: !state.isCartOpen,
					};
				});
			},

			updateIsCartSuccess: () => {
				set((state) => {
					return {
						...state,
						isCartSuccess: !state.isCartSuccess,
					};
				});
			},
		}),

		{
			name: "inCartItem-store",
		}
	)
);

export const useUserStore = create<UserStoreType>()(
	persist(
		(set) => ({
			users: {},

			updateUserInfo: (userID, userInfo) => {
				set((state) => ({
					users: {
						...state.users,
						[userID]: userInfo,
					},
				}));
			},

			updateUserLikedItems: async (userID, userInfo, targetID) => {
				const isLiked = userInfo.likedItemsID.includes(targetID);

				const updateLikedItems = isLiked
					? userInfo.likedItemsID.filter((item) => item !== targetID)
					: [...userInfo.likedItemsID, targetID];

				set((state) => ({
					users: {
						...state.users,
						[userID]: {
							likedItemsID: updateLikedItems,
							inCartItemsID: [...userInfo.inCartItemsID],
						},
					},
				}));

				await fetch("http://localhost:3000/users/1", {
					method: "PATCH",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						userInfo: {
							likedItemsID: updateLikedItems,
							inCartItemsID: [...userInfo.inCartItemsID],
						},
					}),
				});
			},

			updateUserInCartItems: async (userID, userInfo, targetID) => {
				const isIncart = userInfo.inCartItemsID.includes(targetID);

				const updateUserInCart = isIncart
					? userInfo.inCartItemsID.filter((inCart) => inCart !== targetID)
					: [...userInfo.inCartItemsID, targetID];

				set((state) => ({
					users: {
						...state.users,
						[userID]: {
							likedItemsID: [...userInfo.likedItemsID],
							inCartItemsID: updateUserInCart,
						},
					},
				}));

				await fetch("http://localhost:3000/users/1", {
					method: "PATCH",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						userInfo: {
							likedItemsID: [...userInfo.likedItemsID],
							inCartItemsID: updateUserInCart,
						},
					}),
				});
			},
		}),
		{
			name: "user-store",
		}
	)
);
