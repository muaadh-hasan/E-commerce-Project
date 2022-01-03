import { OrderItem } from "./order-item";

export class Order {
  id : number;
  orderTrackingNumber:string;
  totalQuantity: number;
  totalPrice: number;
  status:string;
  dateCreated : Date;
  lastUpdated : Date;
  orderItems: OrderItem[];

}
