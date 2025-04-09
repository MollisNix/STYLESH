"use client";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../../components/ui/navigation-menu";
import Image from "next/image";
import LogoImage from "../../../public/logo.png";
import { Heart, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "../../../store/marketplace-store";

export const Navigation = () => {
	const updateCartStore = useCartStore((state) => state.updateIsCartOpen);
	const cartOnclickHandler = () => {
		updateCartStore();
	};

	return (
		<header className="container flex justify-between border-b-1 my-10 mx-auto pb-7">
			<div className="flex gap-5">
				<Image src={LogoImage} alt="navigation logo" />

				<div className="logo-text__content">
					<h1>
						<strong>STYLESH</strong>
					</h1>
					<p>Магазин кращих кросівок</p>
				</div>
			</div>

			<NavigationMenu>
				<NavigationMenuList className="flex space-x-25">
					<NavigationMenuItem onClick={cartOnclickHandler}>
						<NavigationMenuLink href="#" className="flex flex-row gap-3">
							<ShoppingCart />
							Тотал
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="#" className="flex flex-row gap-3">
							<Heart />
							Обране
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="#" className="flex flex-row gap-3">
							<User />
							Профіль
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
