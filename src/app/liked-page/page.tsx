"use client";
import { ArrowLeftToLine, Heart, SquarePlus } from "lucide-react";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { map } from "lodash";
import Link from "next/link";
import {
	useInCartItemStore,
	useLikedItemStore,
	useUserStore,
} from "../../../store/store";
import { useEffect } from "react";

export default function LikedPage() {
	const getUserInfo = useUserStore((state) => state.users);
	const userLikedItems = getUserInfo[1]?.likedItemsID;

	const updatetLikedItems = useLikedItemStore(
		(state) => state.updateLikedItems
	);

	const updateUserLikedItems = useUserStore(
		(state) => state.updateUserLikedItems
	);

	const likedItems = useLikedItemStore((state) => state.likedItems);

	useEffect(() => {
		const fetchPromis = async () => {
			await updatetLikedItems(userLikedItems);
		};
		fetchPromis();
	}, [updatetLikedItems, userLikedItems]);

	const updateUserInCartItems = useUserStore(
		(state) => state.updateUserInCartItems
	);

	const isAdded = getUserInfo[1].inCartItemsID;

	const updateInCartItems = useInCartItemStore(
		(state) => state.updateInCartItems
	);

	useEffect(() => {
		updateInCartItems(getUserInfo[1].inCartItemsID);
	}, [updateInCartItems, getUserInfo]);

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

								{isAdded.includes(item.id) ? (
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
				</div>
			</div>
		</div>
	);
}
