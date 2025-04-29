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
import Link from "next/link";
import { useInCartItemStore } from "../../../store/store";

export const Navigation = () => {
	const updateIsCartOpen = useInCartItemStore((state) => state.updateIsCartOpen)
	const cartOnclickHandler = () => {
		updateIsCartOpen();
	};

	return (
		<header className="flex flex-col p-6 w-full md:container md:flex-row md:justify-between border-b mx-auto">
			<div className="flex">
				<Link href="/" aria-label="Перехід на головну сторінку" className="md:w-1/4 h-fit">
					<Image src={LogoImage} alt="Stylesh logo" />
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
					<NavigationMenuItem className="cursor-pointer">
						<NavigationMenuLink onClick={cartOnclickHandler} className="flex flex-row">
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
