export interface ICartBase {
  user_id: number;
}

export interface ICartCreate {
  user_id: number;
  items: Array<{ product_id: number; quantity: number }>;
}

export interface ICartUpdate extends ICartBase {
  id: number;
}

export interface ICart extends ICartBase {
  id: number;
  items: Array<{ product_id: number; quantity: number }>;
}

export interface IAddToCart {
  product_id: number;
  quantity: number;
}
