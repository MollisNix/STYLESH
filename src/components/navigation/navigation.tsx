import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../../public/logo.png";
import { ShoppingCart, Heart, User } from "lucide-react";

export const Navigation = () => {
	return (
		<header className="container flex justify-between border-b-1 my-10 mx-20 pb-7">
			<div className="flex gap-5">
				<Image src={LogoImage} className="" alt="navigation logo" />

				<div className="logo-text__content">
					<h1 className="">STYLESH</h1>
					<p>Магазин кращих кросівок</p>
				</div>
			</div>

			<NavigationMenu>
				<NavigationMenuList className="flex space-x-25">
					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link href="#" className="flex gap-3">
								<ShoppingCart />
								Тотал
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link href="#" className="flex gap-3">
								<Heart />
								Обране
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink>
							<Link href="#" className="flex gap-3">
								<User />
								Профіль
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
