import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { menuListBattons } from "./constants";
import Image from "next/image";
import LogoImage from "../../../public/logo.png";
import { map } from "lodash";

export const Navigation = () => {
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
					{map(menuListBattons, ({ href, icon: Icon, text }) => (
						<NavigationMenuItem key={text}>
							<NavigationMenuLink href={href} className="flex flex-row gap-3">
								<Icon />
								{text}
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
