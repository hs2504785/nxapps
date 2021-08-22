import { RouterReducerState } from '@ngrx/router-store';
import { CustomerState } from './customer/customer.reducer';
import { LineItemsState } from './line-item/line-item.reducer';
import { OrderState } from './order/order.reducer';
import { ProductState } from './product/product.reducer';
import { RouterStateUrl } from './shared/utils';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  customer: CustomerState;
  product: ProductState;
  order: OrderState;
  lineItem: LineItemsState;
}
