"use client";
import { useEffect } from "react";
import { ActiveCart } from "./components/active-cart";
import { EmptyCart } from "./components/empty-cart";
import { SuccessCart } from "./components/cart-success";
import { useInCartItemStore } from "../../../store/store";
export const Cart = () => {
	const updateIsCartOpen = useInCartItemStore(
		(state) => state.updateIsCartOpen
	);
	const isCartOpen = useInCartItemStore((state) => state.isCartOpen);
	const isCartSuccess = useInCartItemStore((state) => state.isCartSuccess);
	const inCartData = useInCartItemStore((state) => state.inCartItems);

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

		return () => {
			document.body.style.overflow = "";
		};
	}, [isCartOpen]);
	
	return (
		<div
			className={`overlay fixed inset-0  bg-black/50 z-40 transition-transform duration-300 ease-in-out ${
				isCartOpen ? "block" : "hidden"
			}`}
			onClick={cartOnclickHandler}
		>
			<div
				className={`fixed right-0 top-0 z-50 flex flex-col h-full w-full md:w-md justify-between p-10 bg-white overflow-y-scroll transition-transform duration-300 ${
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
