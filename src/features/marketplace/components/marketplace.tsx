"use client";

import { SquarePlus, Heart } from "lucide-react";

import Image from "next/image";
import { Input } from "../../../components/ui/input";

import {Card,
				CardContent,
				CardFooter,
				CardHeader,
} from "../../../components/ui/card";

import { map } from "lodash";
import { useEffect } from "react";

import { useMarketplaceStore } from "../../../../store/marketplace-store";

export const Marketplace = () => {
	const marketplaceData = useMarketplaceStore(
		(state) => state.marketplaceItems
	);
	const updatedLikedItems = useMarketplaceStore(
		(state) => state.updatedLikedItems
	);
	const updateMarketplace = useMarketplaceStore(
		(state) => state.updateMarketplace
	);

	const updateInCartItems = useMarketplaceStore(
		(state) => state.updateInCartItems
	);

	useEffect(() => {
		updateMarketplace();
	}, []);

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
		<div className="container mx-auto mt-10">
			<div className="top-content flex justify-between text-2xl mb-10">
				<h2>Весь товар</h2>
				<form action="get">
					<Input
						placeholder="Знайди свої кросівки!"
						className="w-2xl rounded-sm"
					/>
				</form>
			</div>
			<div className="marketplace body flex flex-wrap justify-center gap-5">
				{map(marketplaceData, (item) => (
					<Card key={item.id} className="basis-2xs">
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
								width={286}
								height={100}
								className="select-none"
							/>
						</CardHeader>
						<CardContent>
							<strong>{item.itemName}</strong>
						</CardContent>
						<CardFooter className="flex justify-between">
							<strong>Ціна:</strong>
							{item.itemPrice}

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
			</div>
		</div>
	);
};
