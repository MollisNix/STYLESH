"use client";
import { useMarketplaceStore } from "../../../store/marketplace-store";
import { useEffect } from "react";
import { ActiveCart } from "./components/active-cart";
import { EmptyCart } from "./components/empty-cart";
import { SuccessCart } from "./components/cart-success";
export const Cart = () => {
	const isCartOpen = useMarketplaceStore((state) => state.isCartOpen);
	const inCartData = useMarketplaceStore((state) => state.inCartItems);
	const isCartSuccess = useMarketplaceStore((state) => state.isCartSuccess);
	const updateIsCartOpen = useMarketplaceStore(
		(state) => state.updateIsCartOpen
	);

	const cartOnclickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
		const target = e.target as HTMLDivElement;
		if (target.classList.contains("overlay")) updateIsCartOpen();
	};

	useEffect(() => {
		if (isCartOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isCartOpen]);

	return (
		<div
			className={`overlay fixed inset-0  bg-black/50 z-40 transition-transform duration-300 ease-in-out ${
				isCartOpen ? "block" : "hidden"
			}`}
			onClick={cartOnclickHandler}
		>
			<div
				className={`fixed right-0 top-0 z-50 flex flex-col h-full w-md justify-between p-10 bg-white overflow-y-scroll transition-transform duration-300 ${
					isCartOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{isCartSuccess ? (
					<SuccessCart />
				) : inCartData.length === 0 ? (
					<EmptyCart />
				) : (
					<ActiveCart />
				)}
			</div>
		</div>
	);
};
