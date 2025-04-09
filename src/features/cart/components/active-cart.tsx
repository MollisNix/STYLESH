import { Button } from "@/components/ui/button";
import {
	useCartStore,
	useMarketplaceStore,
} from "../../../../store/marketplace-store";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../../components/ui/card";
import Image from "next/image";
import { CircleX } from "lucide-react";
import { map } from "lodash";
import { useEffect } from "react";

export const ActiveCart = () => {
	const isCartOpen = useCartStore((state) => state.isCartOpen);
	const inCartData = useMarketplaceStore((state) => state.inCartItems);
	const isCartSuccess = useCartStore((state) => state.updateisCartSuccess);
	const marketplaceData = useMarketplaceStore(
		(state) => state.marketplaceItems
	);
	const updateInCartItems = useMarketplaceStore(
		(state) => state.updateInCartItems
	);

	const removeCartItem: React.MouseEventHandler<SVGSVGElement> = (e) => {
		const target = e.currentTarget;
		marketplaceData.map((item) => {
			if (target.id === item.id) updateInCartItems(target.id, item);
		});
	};

	const onCartSuccessHandle = () => {
		isCartSuccess();
	};

	useEffect(() => {
		if (isCartOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isCartOpen]);

	const totalItemsPrice = inCartData.reduce(
		(totalCost, item) => totalCost + (item.itemPrice || 0),
		0
	);
	const taxes = (totalItemsPrice * 10) / 100;
	return (
		<>
			<div className="flex flex-col justify-start space-y-10 mb-5">
				<h2>
					<strong>Корзина</strong>
				</h2>

				{map(inCartData, (data) => (
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
								onClick={removeCartItem}
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
					Податок 10%:<span className="ms-5">{taxes} тис. грн.</span>
				</p>
				<strong>
					Усього до сплати:
					<span className="ms-5">{totalItemsPrice + taxes} тис. грн.</span>
				</strong>

				<Button onClick={onCartSuccessHandle}>Оформити замовлення</Button>
			</div>
		</>
	);
};
