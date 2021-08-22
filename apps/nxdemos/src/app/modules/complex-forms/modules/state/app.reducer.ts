import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import { AppState } from './app.interfaces';
import { customerReducer } from './customer/customer.reducer';
import { lineItemReducer } from './line-item/line-item.reducer';
import { orderReducer } from './order/order.reducer';
import { productReducer } from './product/product.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  customer: customerReducer,
  product: productReducer,
  order: orderReducer,
  lineItem: lineItemReducer,
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
