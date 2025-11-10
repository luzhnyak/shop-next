export enum OrderStatusEnum {
  pending = "pending",
  confirmed = "confirmed",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export interface IOrderBase {
  user_id: number;
  address_id: number;
  status: OrderStatusEnum;
}

export interface IOrderCreate {
  user_id: number;
  address_id: number;
  status: OrderStatusEnum;
}

export interface IOrderCreateFromCart {
  address_id: number;
}

export interface IOrderUpdate extends IOrderBase {
  id: number;
}

export interface UpdateStatusOrder {
  id: number;
  status: OrderStatusEnum;
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
  user_name: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  items: Array<IOrderItem>;
}

export interface IAddToOrder {
  userId: number;
  product_id: number;
  quantity: number;
}
