import { Button } from "./ui/button";
import Image from "next/image";
import bannerLogoImg from "../../public/bannerLogo.png";
import bannerBodyImage from "../../public/bannerBodyImg.png";
import Link from "next/link";

export const Banner = () => {
	return (
		<div className="mx-auto mt-10 md:container">
			<div className="banner_content  gap-5 banner-bg-color p-10  lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:rounded-2xl ">
				<Image src={bannerLogoImg} alt="banner-logo-image" />
				<Image
					src={bannerBodyImage}
					alt="banner-body-image"
					className="w-full lg:col-start-2 lg:row-start-1 lg:row-end-3 lg:justify-end"
				/>
				<p className="text-6xl mt-5 lg:col-start-1 lg:row-start-2">
					<span>Обирай найкраще,</span> тільки у нас!
				</p>
				<Button className="mt-10 w-full lg:row-start-3">
					<Link href="#">КУПИТИ</Link>
				</Button>
			</div>
		</div>
	);
};
