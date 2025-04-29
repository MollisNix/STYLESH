import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useInCartItemStore } from "../../../../store/store";

export const SuccessCart = () => {
	const updateIsCartOpen = useInCartItemStore(
		(state) => state.updateIsCartOpen
	);
	const updateIsCartSuccess = useInCartItemStore(
		(state) => state.updateIsCartSuccess
	);
	const cartOnclickHandler = () => {
		updateIsCartOpen();
		updateIsCartSuccess();
	};

	return (
		<>
			<h2>
				<strong>Корзина</strong>
			</h2>

			<div className="flex flex-col items-center space-y-10">
				<Image
					src="/cart-success.svg"
					alt="cart-success logo"
					width={200}
					height={100}
					className="select-none"
				/>
				<h6>Замовлення офорлмено!</h6>
				<p>Ваше замовлення №13 вже скоро буде передано курєрам на доставку.</p>
				<Button onClick={cartOnclickHandler}>Повернутися назад</Button>
			</div>
		</>
	);
};
