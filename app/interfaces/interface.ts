export interface Transaction {
  id: string;
  type: string;
  description: string | any;
  transactionCategoryId: string;
  amount: number;
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
