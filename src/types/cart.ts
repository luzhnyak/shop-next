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

export interface ICartItem {
  product_id: number;
  quantity: number;
  product_name: string;
  price: number;
}

export interface UpdateCartItemPayload {
  id: number;
  quantity: number;
}

export interface ICart extends ICartBase {
  id: number;
  items: Array<ICartItem>;
}

export interface IAddToCart {
  userId: number;
  product_id: number;
  quantity: number;
}
