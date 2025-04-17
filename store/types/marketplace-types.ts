export type MarketplaceItemsType = {
	itemName: string;
	itemImage: string;
	itemPrice: number;
	id: string;
	isLiked: boolean;
	isAdded: boolean;
};

export type MarketplaceData = {
	storageItems: MarketplaceItemsType[];
};

export type MarketplaceStoreType = {
	marketplaceItems: MarketplaceItemsType[];
	likedItems: MarketplaceItemsType[];
	inCartItems: MarketplaceItemsType[];
	searchedItems: MarketplaceItemsType[];
	isCartOpen: boolean;
	isCartSuccess: boolean;
	updatedLikedItems: (targetID: string, item: MarketplaceItemsType) => void;
	updateMarketplace: () => Promise<void>;
	updateInCartItems: (targetID: string, item: MarketplaceItemsType) => void;
	updateSearchedItems: (searchedInputValue: string) => void;
	updateIsCartSuccess: () => void;
	updateIsCartOpen: () => void;
};
