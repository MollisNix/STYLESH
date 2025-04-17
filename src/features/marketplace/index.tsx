"use client";

import { Input } from "../../components/ui/input";

import { Skeleton } from "@/components/ui/skeleton";

import { useEffect, useCallback } from "react";

import debounce from "lodash/debounce";

import { useMarketplaceStore } from "../../../store/marketplace-store";
import {
	MarketplaceItems,
	SearchedItems,
} from "./components/marketplace-items";

export const Marketplace = () => {
	const marketplaceData = useMarketplaceStore(
		(state) => state.marketplaceItems
	);
	const updateMarketplace = useMarketplaceStore(
		(state) => state.updateMarketplace
	);
	const updateSearchedItems = useMarketplaceStore(
		(state) => state.updateSearchedItems
	);
	const searchedItems = useMarketplaceStore((state) => state.searchedItems);

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			updateSearchedItems(value.toLowerCase());
		}, 300),
		[updateSearchedItems]
	);

	const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		debouncedSearch(e.target.value.toLowerCase());
	};

	useEffect(() => {
		let isMounted = true;
		
		if(isMounted) updateMarketplace();
		

		return () => {
			isMounted = false;
		}
	}, [updateMarketplace]);

	if (marketplaceData.length === 0) {
		return (
			<div className="container mx-auto mt-10 ">
				<div className="marketplace flex flex-wrap justify-center gap-5">
					{Array(4)
						.fill(0)
						.map((_, index) => (
							<div
								key={index}
								className="flex flex-col space-y-3 shadow-md p-10"
							>
								<Skeleton className="h-[125px] w-[250px] rounded-xl basis-2xs" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						))}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col mt-10 gap-5 mx-auto md:container">
			<div className="top-content flex flex-col w-full justify-center gap-5 md:flex-row md:justify-between md:px-10 max-xl:px-10 xl:p-0">
				<h2 className="text-center text-2xl">Весь товар</h2>
				<form action="get">
					<Input
						placeholder="Знайди свої кросівки!"
						className="w-full md:w-2xs lg:w-2xl"
						onChange={onChangeHandler}
					/>
				</form>
			</div>
			<div className="marketplace flex flex-wrap  lg:grid lg:grid-cols-4 lg:p-5  justify-center gap-5 mb-10 xl:justify-start ">
				{searchedItems.length === 0 ? <MarketplaceItems /> : <SearchedItems />}
			</div>
		</div>
	);
};
