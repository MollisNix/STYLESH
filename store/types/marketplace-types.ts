type MarketplaceItems = {
	itemName: string;
	itemImage: string;
	itemPrice: number;
	id: string;
	isLiked: boolean;
	isAdded: boolean;
};

export type MarketplaceData = {
	storageItems: MarketplaceItems[];
};

export type MarketplaceStoreType = {
	marketplaceItems: MarketplaceItems[];
	likedItems: MarketplaceItems[];
	inCartItems: MarketplaceItems[],
	searchedItems: MarketplaceItems[];
	isCartOpen: boolean;
	isCartSuccess: boolean;
	updatedLikedItems: (targetID: string, item: MarketplaceItems) => void;
	updateMarketplace: () => Promise<void>;
	updateInCartItems: (targetID: string, item: MarketplaceItems) => void;
	updateSearchedItems: (searchedInputValue: string)=> void;
	updateIsCartSuccess: ()=> void;
	updateIsCartOpen: ()=> void;
};