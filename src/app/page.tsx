import { Banner } from "@/components/banner";
import { Cart } from "@/features/cart";

import { Marketplace } from "@/features/marketplace";

export default function Home() {
	return (
		<>
			<Banner />
			<Marketplace/>
			<Cart/>
		</>
	);
}
