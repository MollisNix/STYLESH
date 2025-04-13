import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	MarketplaceStoreType,
	MarketplaceData,
} from "./types/marketplace-types";

export const useMarketplaceStore = create<MarketplaceStoreType>()(
	persist(
		(set) => ({
			marketplaceItems: [],
			likedItems: [],
			inCartItems: [],
			searchedItems: [],
			isCartOpen: false,
			isCartSuccess: false,

			updateInCartItems: (targetID, item) => {
				set((state) => {
					const isAdded = state.inCartItems.some(
						(item) => item.id === targetID
					);

					let updateInCartItems = state.inCartItems;
					const updatedMarketplaceItems = state.marketplaceItems.map(
						(marketItem) => {
							if (marketItem.id === targetID) {
								return { ...marketItem, isAdded: !marketItem.isAdded };
							}

							return marketItem;
						}
					);

					const updatedSearchedItems = state.searchedItems.map((searchItem) => {
						if (searchItem.id === targetID) {
							return { ...searchItem, isAdded: !searchItem.isAdded };
						}
						return searchItem;
					});

					const updateLikedItems = state.likedItems.map((likedItem) => {
						if (likedItem.id === targetID) {
							return { ...likedItem, isAdded: !likedItem.isAdded };
						}
						return likedItem;
					});

					if (!isAdded) {
						updateInCartItems = [...state.inCartItems, item];
					} else {
						updateInCartItems = state.inCartItems.filter(
							(item) => item.id !== targetID
						);
					}

					return {
						...state,
						likedItems: updateLikedItems,
						marketplaceItems: updatedMarketplaceItems,
						searchedItems: updatedSearchedItems,
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

					const updateSearchedItems = state.searchedItems.map(
						(searchedItem) => {
							if (searchedItem.id === targetID) {
								return { ...searchedItem, isLiked: !searchedItem.isLiked };
							} else {
								return searchedItem;
							}
						}
					);

					if (!isLiked) {
						updatedLikedItems = [
							...state.likedItems,
							{ ...item, isLiked: !item.isLiked },
						];
					} else {
						updatedLikedItems = state.likedItems.filter(
							(item) => item.id !== targetID
						);
					}

					return {
						...state,
						likedItems: updatedLikedItems,
						marketplaceItems: updatedMarketplaceItems,
						searchedItems: updateSearchedItems,
					};
				}),

			updateSearchedItems: (searchedInputValue) => {
				if (!searchedInputValue || !searchedInputValue.trim()) {
					set({ searchedItems: [] });
					return;
				}

				set((state) => {
					const updateSearchedItems = state.marketplaceItems.filter((item) =>
						item.itemName.toLowerCase().includes(searchedInputValue)
					);

					return {
						searchedItems: updateSearchedItems,
					};
				});
			},

			updateIsCartOpen: () => {
				set((state) => {
					return { ...state, isCartOpen: !state.isCartOpen };
				});
			},

			updateIsCartSuccess: () => {
				set((state) => {
					return { ...state, isCartSuccess: !state.isCartSuccess };
				});
			},

			updateMarketplace: async () => {
				try {
					const response = await fetch("/server/marketplaceDB.json");

					if (!response.ok)
						throw new Error(`HTTP error!, status${response.status}`);

					const data: MarketplaceData = await response.json();

					set((state) => {
						const initialization = data.storageItems.map((item) => {
							return {
								...item,
								isLiked: state.likedItems.some(
									(likedItem) => likedItem.id === item.id
								),
								isAdded: state.inCartItems.some(
									(cartItem) => cartItem.id === item.id
								),
							};
						});
						const validLikedItems = state.likedItems.filter((likedItem) =>
							initialization.some((newItem) => likedItem.id === newItem.id)
						);
						const validCartItem = state.inCartItems.filter((cartItem) =>
							initialization.some((newItem) => cartItem.id === newItem.id)
						);

						return {
							marketplaceItems: initialization,
							likedItems: validLikedItems,
							inCartItems: validCartItem,
							searchedItems: [],
						};
					});
				} catch (error) {
					console.error("Failed to fetch  marketplace data:", error);
					alert(error);
				}
			},
		}),
		{
			name: "marketplace-store",
			partialize: (state) => ({
				likedItems: state.likedItems,
				inCartItems: state.inCartItems,
			}),
		}
	)
);
