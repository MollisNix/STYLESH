import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { menuListBattons } from "./constants";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../../public/logo.png";
import { map } from "lodash";

export const Navigation = () => {
	return (
		<header className="container flex justify-between border-b-1 my-10 mx-auto pb-7">
			<div className="flex gap-5">
				<Image src={LogoImage} className="" alt="navigation logo" />

				<div className="logo-text__content">
					<h1 className="">STYLESH</h1>
					<p>Магазин кращих кросівок</p>
				</div>
			</div>

			<NavigationMenu>
				<NavigationMenuList className="flex space-x-25">
					{map(menuListBattons, ({ href, icon: Icon, text }) => (
						<NavigationMenuItem key={text}>
							<NavigationMenuLink>
								<Link href={href} className="flex gap-3">
									<Icon />
									{text}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
