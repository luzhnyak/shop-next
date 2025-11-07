export interface IOrderBase {
  user_id: number;
  address_id: number;
}

export interface IOrderCreate {
  user_id: number;
  address_id: number;
  status: string;
}

export interface IOrderCreateFromCart {
  address_id: number;
}

export interface IOrderUpdate extends IOrderBase {
  id: number;
}

export interface UpdateStatusOrder {
  id: number;
  status: string;
}

export interface IOrderItem {
  product_id: number;
  quantity: number;
  product_name: string;
  price: number;
}

export interface UpdateOrderItemPayload {
  id: number;
  quantity: number;
}

export interface IOrder extends IOrderBase {
  id: number;
  status: string;
  items: Array<IOrderItem>;
}

export interface IAddToOrder {
  userId: number;
  product_id: number;
  quantity: number;
}
