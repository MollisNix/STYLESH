export type MarketplaceItemsType = {
	itemName: string;
	itemImage: string;
	itemPrice: number;
	id: string;
	isLiked: boolean;
	isAdded: boolean;
};

export type MarketplaceStoreType = {
	maketplaceItems: MarketplaceItemsType[];
	searchedItems: MarketplaceItemsType[];
	updateMarketplaceItems: () => Promise<void>;
	updateSearchedItems: (searchValue: string) => void;
};

export type UserInfoType = {
	likedItemsID: string[];
	inCartItemsID: string[];
};

export type UsersDB = {
	id: string;
	userInfo: UserInfoType;
};

export type UserStoreType = {
	users: { [userID: string]: UserInfoType };
	updateUserInfo: (userID: string, userInfo: UserInfoType) => void;
	updateUserLikedItems: (
		userID: string,
		userInfo: UserInfoType,
		targetID: string
	) => void;
	updateUserInCartItems: (
		userID: string,
		userInfo: UserInfoType,
		targetID: string
	) => void;
};

export type LikedItemStore = {
	likedItems: MarketplaceItemsType[];

	updateLikedItems: (likedItemsID: string[]) => Promise<void>;
};

export type CartItemSotreType = {
	inCartItems: MarketplaceItemsType[];
	isCartOpen: boolean;
	isCartSuccess: boolean;
	updateInCartItems: (inCartItemsID: string[]) => void;
	updateIsCartOpen: () => void;
	updateIsCartSuccess: () => void;
};
