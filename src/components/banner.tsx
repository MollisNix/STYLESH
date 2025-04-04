import { Button } from "./ui/button";
import Image from "next/image";
import bannerLogoImg from "../../public/bannerLogo.png";
import bannerBodyImage from "../../public/bannerBodyImg.png";
import Link from "next/link";

export const Banner = () => {
	return (
		<div className="container mx-auto mt-20">
			<div className="banner_content  grid grid-cols-2 grid-rows-2 gap-5 banner-bg-color p-10 rounded-2xl">
				<Image src={bannerLogoImg} alt="banner-logo-image" />
				<p className="col-start-1 row-start-2 text-6xl">
					<span>Обирай найкраще,</span> тільки у нас!
				</p>
				<Button className="row-start-3 w-1/3" asChild={true}>
					<Link href="#">КУПИТИ</Link>
				</Button>
				<Image
					height={300}
					src={bannerBodyImage}
					alt="banner-body-image"
					className="col-start-2 row-start-1 row-end-3 justify-end"
				/>
			</div>
		</div>
	);
};
