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
import Link from "next/link";

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
				<Link href="/" className="md:w-1/4 h-fit">
					<Image src={LogoImage} alt="navigation logo" />
				</Link>

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
						<NavigationMenuLink>
							<ShoppingCart className="me-2" />
							Тотал
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link href="/liked-page" className="flex flex-row">
								<Heart className="me-2" />
								Обране
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link href="#" className="flex flex-row">
								<User className="me-2" />
								Профіль
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
