import { MarketplaceItemsType } from "./types/marketplace-types";

export const updateCartSubstores = (
	storeArray: MarketplaceItemsType[],
	targetID: string
): MarketplaceItemsType[] => {
	return storeArray.map((item) => {
		if (item.id === targetID) {
			return { ...item, isAdded: !item.isAdded };
		}

		return item;
	});
};

export const updateLikedItemsSubstores = (
	storeArray: MarketplaceItemsType[],
	targetID: string
): MarketplaceItemsType[] => {
	return storeArray.map((item) => {
		if (item.id === targetID) {
			return { ...item, isLiked: !item.isLiked };
		}

		return item;
	});
};