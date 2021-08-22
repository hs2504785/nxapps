import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  addOrderSuccess,
  clearSelectedOrder,
  deleteOrderSuccess,
  updateOrderSuccess,
  loadOrder,
  loadOrderSuccess,
  LoadOrderFail,
  loadOrders,
  loadOrdersSuccess,
  LoadOrdersFail,
  selectOrder,
} from './order.actions';
import { Order } from './order.model';
import { createReducer, on } from '@ngrx/store';

export interface OrderState extends EntityState<Order> {
  // additional entities state properties
  selectedOrderId: number;
  loading: boolean;
  error: string;
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrderState = orderAdapter.getInitialState({
  // additional entity state properties
  selectedOrderId: 0,
  loading: false,
  error: '',
});

export const orderReducer = createReducer(
  initialState,
  on(
    addOrderSuccess,
    (state, action): OrderState => orderAdapter.addOne(action.order, state)
  ),
  on(clearSelectedOrder, (state): OrderState => {
    return {
      ...state,
      selectedOrderId: 0,
    };
  }),
  on(
    deleteOrderSuccess,
    (state, action): OrderState => orderAdapter.removeOne(action.id, state)
  ),

  on(
    updateOrderSuccess,
    (state, action): OrderState => orderAdapter.updateOne(action.order, state)
  ),
  on(loadOrder, (state, action): OrderState => {
    return {
      ...state,
      selectedOrderId: action.id,
      loading: true,
      error: '',
    };
  }),
  on(loadOrderSuccess, (state, action): OrderState => {
    return {
      ...orderAdapter.addOne(action.order, state),
      loading: false,
    };
  }),
  on(LoadOrderFail, (state): OrderState => {
    return {
      ...state,
      loading: false,
      error: 'error loading order',
    };
  }),
  on(loadOrders, (state): OrderState => {
    return {
      ...orderAdapter.removeAll(state),
      loading: true,
      error: '',
    };
  }),
  on(loadOrdersSuccess, (state, action): OrderState => {
    return {
      ...orderAdapter.addMany(action.orders, state),
      loading: false,
    };
  }),
  on(LoadOrdersFail, (state): OrderState => {
    return {
      ...state,
      loading: false,
      error: 'error loading orders',
    };
  }),
  on(selectOrder, (state, action): OrderState => {
    return {
      ...state,
      selectedOrderId: action.order.id,
    };
  })
);

export const getSelectedId = (state: OrderState) => state.selectedOrderId;
export const getLoading = (state: OrderState) => state.loading;
export const getError = (state: OrderState) => state.error;
