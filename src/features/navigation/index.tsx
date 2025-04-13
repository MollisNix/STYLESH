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
import { useMarketplaceStore } from "../../../store/marketplace-store";

export const Navigation = () => {
	const updateCartStore = useMarketplaceStore(
		(state) => state.updateIsCartOpen
	);
	const cartOnclickHandler = () => {
		updateCartStore();
	};

	return (
		<header className="flex flex-col p-6 w-full md:container md:flex-row md:justify-between border-b-1 mx-auto">
			<div className="flex">
				<Image
					src={LogoImage}
					alt="navigation logo"
					className="md:w-1/4 h-fit"
				/>

				<div className="logo-text__content ms-5">
					<h1>
						<strong>STYLESH</strong>
					</h1>
					<p>Магазин кращих кросівок</p>
				</div>
			</div>

			<NavigationMenu className="flex mt-10 me-10 md:my-auto">
				<NavigationMenuList className="flex flex-row gap-5 ms-10">
					<NavigationMenuItem onClick={cartOnclickHandler}>
						<NavigationMenuLink href="#" className="flex flex-row">
							<ShoppingCart />
							Тотал
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="#" className="flex flex-row">
							<Heart />
							Обране
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="#" className="flex flex-row">
							<User />
							Профіль
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
