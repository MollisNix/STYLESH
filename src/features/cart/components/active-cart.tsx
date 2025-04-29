import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../../components/ui/card";
import Image from "next/image";
import { CircleX } from "lucide-react";
import { map } from "lodash";
// import { useEffect } from "react";
import { useInCartItemStore, useUserStore } from "../../../../store/store";

export const ActiveCart = () => {
	const inCartItems = useInCartItemStore((state) => state.inCartItems);
	const getUserInfo = useUserStore((state) => state.users);

	const removeCartItems = useUserStore((state) => state.updateUserInCartItems);
	const updateIsCartOpen = useInCartItemStore(
		(state) => state.updateIsCartOpen
	);
	const isCartSuccess = useInCartItemStore(
		(state) => state.updateIsCartSuccess
	);

	const totalItemsPrice = inCartItems.reduce(
		(totalCost, item) => totalCost + (item.itemPrice || 0),
		0
	);
	const taxes = (totalItemsPrice * 10) / 100;
	return (
		<>
			<div className="flex flex-col justify-start space-y-10 mb-5">
				<div className="flex flex-row justify-between md:hidden">
					<h2>
						<strong>Корзина</strong>
					</h2>
					<Button onClick={() => updateIsCartOpen()} className="w-1/2">
						Продовжити придбання
					</Button>
				</div>
				<h2 className="hidden lg:block">
					<strong>Корзина</strong>
				</h2>

				{map(inCartItems, (data) => (
					<Card className="flex flex-row" key={data.id}>
						<CardHeader className="me-5">
							<Image
								src={data.itemImage}
								alt="marketplaceItem"
								className="max-w-none"
								width={60}
								height={30}
							/>
						</CardHeader>
						<CardContent>{data.itemName}</CardContent>
						<CardFooter>
							<CircleX
								className="cursor-pointer"
								onClick={() => removeCartItems("1", getUserInfo[1], data.id)}
								id={data.id}
							/>
						</CardFooter>
					</Card>
				))}
			</div>

			<div className="flex flex-col gap-5 text-lg">
				<p>
					Ціна товару:<span className="ms-5">{totalItemsPrice} тис. грн.</span>
				</p>
				<p>
					Податок 10%:<span className="ms-5">{taxes} грн.</span>
				</p>
				<strong>
					Усього до сплати:
					<span className="ms-5">{totalItemsPrice + taxes} тис. грн.</span>
				</strong>

				<Button onClick={() => isCartSuccess()}>Оформити замовлення</Button>
			</div>
		</>
	);
};
