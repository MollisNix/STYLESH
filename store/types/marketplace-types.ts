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
	updatedLikedItems: (targetID: string, item: MarketplaceItems) => void;
	updateMarketplace: () => Promise<void>;
	updateInCartItems: (targetID: string, item: MarketplaceItems) => void;
};


export type CartStoreType = {
	isCartOpen: boolean;
	isCartSuccess: boolean;
	updateisCartSuccess: ()=> void;
	updateIsCartOpen: ()=> void;
}