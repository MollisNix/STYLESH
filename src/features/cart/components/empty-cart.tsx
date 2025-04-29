import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useInCartItemStore } from "../../../../store/store";
export const EmptyCart = () => {
	const updateIsCartOpen = useInCartItemStore((state) => state.updateIsCartOpen)
	const cartOnclickHandler = () => {
		updateIsCartOpen();
	};

	return (
		<>
			<h2>
				<strong>Корзина</strong>
			</h2>

			<div className="flex flex-col items-center space-y-10">
				<Image
					src="/empty-cart.svg"
					alt="empty-cart logo"
					width={200}
					height={100}
					className="select-none"
				/>
				<p>Додайте хоча б пару кросівок, щоб зробити замовлення.</p>
				<Button onClick={cartOnclickHandler}>Повернутися назад</Button>
			</div>
		</>
	);
};
