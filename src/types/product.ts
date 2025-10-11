export interface IProductBase {
  name: string;
  description: string;
  base_price: number;
  sku: string;
  stock_quantity: number;
  category_id: number;
}

interface IProductOption {
  id: number;
  name: string;
  value: string;
  additional_price: number;
}

interface IProductImage {
  id: number;
  image_url: string;
  is_main: boolean;
}

export interface IProductCreate extends IProductBase {
  options?: IProductOption[];
  images?: IProductImage[];
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
  options: IProductOption[];
  images: IProductImage[];
  created_at: string;
  updated_at: string;
}
