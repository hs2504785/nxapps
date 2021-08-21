import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import { AppState } from './app.interfaces';
import { productReducer } from './product/product.reducer';
// import { reducer as orderReducer } from './order/order.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  // customer: customerReducer,
  product: productReducer,
  // order: orderReducer,
  // lineItem: lineItemReducer,
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
