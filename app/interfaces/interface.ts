export interface Transaction {
	date: Date | string | any;
	description: string;
}

export interface Product {
	id: number;
	name: string;
}

export interface Yield {
	id: number;
	productId: number;
	plantingTime: string;
	harvestTime: any;
	description: string;
	quantity: number;
	isHarvested: boolean;
	product: Product;
}
