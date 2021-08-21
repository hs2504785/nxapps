import { RouterReducerState } from '@ngrx/router-store';
import { ProductState } from './product/product.reducer';
import { RouterStateUrl } from './shared/utils';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  // customer: customerState;
  product: ProductState;
  // order: orderState;
  // lineItem: lineItemState;
}
