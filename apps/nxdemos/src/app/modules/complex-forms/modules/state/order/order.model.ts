import { Customer } from '../customer/customer.model';
import { LineItem } from '../line-item/line-item.model';
import { Product } from '../product/product.model';

export interface Order {
  id: number;
  customerId: number;
  lineItemIds: number[];
}

export interface OrderView {
  order: Order;
  customer: Customer;
  lineItems: LineItem[];
  products: Product[];
}
