import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../../components/ui/card";

import { Heart, SquarePlus } from "lucide-react";
import Image from "next/image";
import { map } from "lodash";
import { useMarketplaceStore } from "../../../../store/marketplace-store";

export const MarketplaceItems = () => {
	const marketplaceData = useMarketplaceStore(
		(state) => state.marketplaceItems
	);
	const updatedLikedItems = useMarketplaceStore(
		(state) => state.updatedLikedItems
	);
	const updateInCartItems = useMarketplaceStore(
		(state) => state.updateInCartItems
	);
	const addTowishListHandler: React.MouseEventHandler<SVGSVGElement> = (e) => {
		const target = e.currentTarget;
		marketplaceData.map((item) => {
			if (item.id === target.id) {
				updatedLikedItems(target.id, item);
			}
		});
	};

	const addToCartHandler: React.MouseEventHandler<SVGSVGElement> = (e) => {
		const target = e.currentTarget;

		marketplaceData.map((item) => {
			if (item.id === target.id) {
				updateInCartItems(target.id, item);
			}
		});
	};

	return (
		<>
			{map(marketplaceData, (item) => (
				<Card key={item.id} className="basis-2/5 text-xs justify-center">
					<CardHeader>
						{item.isLiked ? (
							<Heart
								className="cursor-pointer"
								color="#e60a20"
								onClick={addTowishListHandler}
								id={item.id}
							/>
						) : (
							<Heart
								className="cursor-pointer"
								onClick={addTowishListHandler}
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

						{item.isAdded ? (
							<SquarePlus
								className="cursor-pointer"
								color="#07cf43"
								onClick={addToCartHandler}
								id={item.id}
							/>
						) : (
							<SquarePlus
								className="cursor-pointer"
								onClick={addToCartHandler}
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
	const searchedItems = useMarketplaceStore((state) => state.searchedItems);
	const updatedLikedItems = useMarketplaceStore(
		(state) => state.updatedLikedItems
	);
	const updateInCartItems = useMarketplaceStore(
		(state) => state.updateInCartItems
	);

	const addTowishListHandler: React.MouseEventHandler<SVGSVGElement> = (e) => {
		const target = e.currentTarget;
		searchedItems.map((item) => {
			if (item.id === target.id) {
				updatedLikedItems(target.id, item);
			}
		});
	};

	const addToCartHandler: React.MouseEventHandler<SVGSVGElement> = (e) => {
		const target = e.currentTarget;

		searchedItems.map((item) => {
			if (item.id === target.id) {
				updateInCartItems(target.id, item);
			}
		});
	};

	return (
		<>
			{map(searchedItems, (item) => (
				<Card
					key={item.id}
					className="basis-2/5 text-xs justify-center lg:basis-2xs"
				>
					<CardHeader>
						{item.isLiked ? (
							<Heart
								className="cursor-pointer"
								color="#e60a20"
								onClick={addTowishListHandler}
								id={item.id}
							/>
						) : (
							<Heart
								className="cursor-pointer"
								onClick={addTowishListHandler}
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

						{item.isAdded ? (
							<SquarePlus
								className="cursor-pointer"
								color="#07cf43"
								onClick={addToCartHandler}
								id={item.id}
							/>
						) : (
							<SquarePlus
								className="cursor-pointer"
								onClick={addToCartHandler}
								id={item.id}
							/>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};
