import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../../components/ui/card";

import { Heart, SquarePlus } from "lucide-react";
import Image from "next/image";
import { map } from "lodash";
import { useMarketplaceStore, useUserStore } from "../../../../store/store";

export const MarketplaceItems = () => {
	const marketplaceData = useMarketplaceStore((state) => state.maketplaceItems);

	const updateUserInCartItems = useUserStore(
		(state) => state.updateUserInCartItems
	);
	const updateUserLikedItems = useUserStore(
		(state) => state.updateUserLikedItems
	);

	const getUserInfo = useUserStore((state) => state.users);
	const userLikedItems = getUserInfo[1]?.likedItemsID;
	const userInCartItems = getUserInfo[1]?.inCartItemsID;

	return (
		<>
			{map(marketplaceData, (item) => (
				<Card key={item.id} className="basis-2/5 text-xs justify-center">
					<CardHeader>
						{userLikedItems?.includes(item.id) ? (
							<Heart
								className="cursor-pointer"
								color="#e60a20"
								onClick={() =>
									updateUserLikedItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						) : (
							<Heart
								className="cursor-pointer"
								onClick={() =>
									updateUserLikedItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						)}

						<Image
							src={item.itemImage}
							alt="marketplace-item-image"
							width={100}
							height={100}
							className="select-none w-full"
						/>
					</CardHeader>
					<CardContent className="">
						<strong>{item.itemName}</strong>
					</CardContent>
					<CardFooter className="flex justify-between">
						<div className="flex flex-col">
							<strong>Ціна:</strong>
							<strong>{item.itemPrice} тис. грн.</strong>
						</div>

						{userInCartItems?.includes(item.id) ? (
							<SquarePlus
								className="cursor-pointer"
								color="#07cf43"
								onClick={() =>
									updateUserInCartItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						) : (
							<SquarePlus
								className="cursor-pointer"
								onClick={() =>
									updateUserInCartItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};

export const SearchedItems = () => {
	const getUserInfo = useUserStore((state) => state.users);
	const userLikedItems = getUserInfo[1]?.likedItemsID;
	const userInCartItems = getUserInfo[1]?.inCartItemsID;

	const searchedItems = useMarketplaceStore((state) => state.searchedItems);

	const updateUserLikedItems = useUserStore(
		(state) => state.updateUserLikedItems
	);
	const updateUserInCartItems = useUserStore(
		(state) => state.updateUserInCartItems
	);

	return (
		<>
			{map(searchedItems, (item) => (
				<Card
					key={item.id}
					className="basis-2/5 text-xs justify-center lg:basis-2xs"
				>
					<CardHeader>
						{userLikedItems?.includes(item.id) ? (
							<Heart
								className="cursor-pointer"
								color="#e60a20"
								onClick={() =>
									updateUserLikedItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						) : (
							<Heart
								className="cursor-pointer"
								onClick={() =>
									updateUserLikedItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						)}

						<Image
							src={item.itemImage}
							alt="marketplace-item-image"
							width={100}
							height={100}
							className="select-none w-full"
						/>
					</CardHeader>
					<CardContent>
						<strong>{item.itemName}</strong>
					</CardContent>
					<CardFooter className="flex justify-between">
						<div className="flex flex-col">
							<strong>Ціна:</strong>
							<strong>{item.itemPrice} тис. грн.</strong>
						</div>

						{userInCartItems?.includes(item.id) ? (
							<SquarePlus
								className="cursor-pointer"
								color="#07cf43"
								onClick={() =>
									updateUserInCartItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						) : (
							<SquarePlus
								className="cursor-pointer"
								onClick={() =>
									updateUserInCartItems("1", getUserInfo[1], item.id)
								}
								id={item.id}
							/>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};
