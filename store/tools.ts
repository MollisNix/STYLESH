import { MarketplaceItemsType } from "./types/store-types";

export async function fetchTool() {
	const response = await fetch("http://localhost:3000/storageItems");
	if (!response.ok) throw new Error("HTTP Request Error");

	const data: MarketplaceItemsType[] = await response.json();

	return data;
}
