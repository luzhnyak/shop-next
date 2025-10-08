export interface IProductBase {
  name: string;
  description: string;
  base_price: number;
  sku: string;
  stock_quantity: number;
  category_id: number;
}

export interface IProductCreate extends IProductBase {
  options?: string[];
  images?: string[];
}

export interface IProductUpdate extends IProductCreate {
  id: number;
}

export interface IProductVisibilityUpdate {
  id: number;
  visibility: boolean;
}

export interface IProduct extends IProductBase {
  id: number;
  options: string[];
  images: string[];
  created_at: string;
  updated_at: string;
}
