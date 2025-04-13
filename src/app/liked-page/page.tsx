"use client";
import { ArrowLeftToLine, Heart, SquarePlus } from "lucide-react";
import { useMarketplaceStore } from "../../../store/marketplace-store";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { map } from "lodash";
import Link from "next/link";

export default function LikedPage() {
	const likedItems = useMarketplaceStore((state) => state.likedItems);
	const marketplaceData = useMarketplaceStore(
		(state) => state.marketplaceItems
	);
	const updatedLikedItems = useMarketplaceStore(
		(state) => state.updatedLikedItems
	);
	const updateInCartItems = useMarketplaceStore(
		(state) => state.updateInCartItems
	);
	const deleteFromWishListHandler: React.MouseEventHandler<SVGSVGElement> = (
		e
	) => {
		const target = e.currentTarget;
		likedItems.map((item) => {
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

	if (likedItems.length === 0) {
		return (
			<div className="flex flex-col justify-center">
				<h2 className="text-center mt-45 text-2xl">
					<strong>У вас немає замовлень</strong>
				</h2>
				<Link
					href="/"
					className="flex gap-5 mt-10 mx-auto border p-3 rounded-2xl"
				>
					<ArrowLeftToLine />
					Повернутися назад
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center">
			<Link
				href="/"
				className="flex gap-5 mt-10 mx-auto border p-3 rounded-2xl"
			>
				<ArrowLeftToLine />
				Повернутися назад
			</Link>

			<div className="flex  flex-col gap-5 mx-auto mt-10 xl:container	">
				<h2 className="text-2xl">
					<strong>Мої Закладки</strong>
				</h2>
				<div className="grid grid-col-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{map(likedItems, (item) => (
						<Card key={item.id} className="basis-2/5 text-xs justify-center">
							<CardHeader>
								{item.isLiked ? (
									<Heart
										className="cursor-pointer"
										color="#e60a20"
										onClick={deleteFromWishListHandler}
										id={item.id}
									/>
								) : (
									<Heart
										className="cursor-pointer"
										onClick={deleteFromWishListHandler}
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
				</div>
			</div>
		</div>
	);
}
