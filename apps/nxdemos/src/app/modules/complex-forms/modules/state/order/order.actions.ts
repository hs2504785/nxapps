import { Update } from '@ngrx/entity';
import { Order } from './order.model';
import { createAction, props } from '@ngrx/store';
import { LineItem } from '../line-item/line-item.model';
import { Validation } from '../../../../../../app/core/interfaces/validation';

export enum OrderActionTypes {
  AddOrder = '[Order] Add Order',
  AddOrderSuccess = '[Order] Add Order Success',
  AddOrderFail = '[Order] Add Order Fail',
  ClearSelectedOrder = '[Order] Clear Selected Order',
  DeleteOrder = '[Order] Delete Order',
  DeleteOrderSuccess = '[Order] Delete Order Success',
  DeleteOrderFail = '[Order] Delete Order Fail',
  LoadOrder = '[Order] Load Order',
  LoadOrderSuccess = '[Order] Load Order Success',
  LoadOrderFail = '[Order] Load Order Fail',
  LoadOrdersView = '[Order] Load Orders View',
  LoadOrders = '[Order] Load Orders',
  LoadOrdersSuccess = '[Order] Load Orders Success',
  LoadOrdersFail = '[Order] Load Orders Fail',
  SelectOrder = '[Order] Select Order',
  UpdateOrder = '[Order] Update Order',
  UpdateOrderSuccess = '[Order] Update Order Success',
  UpdateOrderFail = '[Order] Update Order Fail',
  UpdateLineItemsAndOrder = '[Order] Update LineItems and Order',
  UpdateLineItemsAndOrderSuccess = '[Order] Update LineItems and Order Success',
  UpdateLineItemsAndOrderFail = '[Order] Update LineItems and Order Fail',
  OpenOrderValidationDialog = '[Order] Open order validation dialog',
  CloseOrderValidationDialog = '[Order] Close order validation dialog',
}

export const addOrder = createAction(
  OrderActionTypes.AddOrder,
  props<{ lineItems: LineItem[]; order: Order }>()
);

export const addOrderSuccess = createAction(
  OrderActionTypes.AddOrderSuccess,
  props<{ lineItems: LineItem[]; order: Order }>()
);

export const addOrderFail = createAction(OrderActionTypes.AddOrderFail);

export const clearSelectedOrder = createAction(
  OrderActionTypes.ClearSelectedOrder
);

export const deleteOrder = createAction(
  OrderActionTypes.DeleteOrder,
  props<{ id: number }>()
);

export const deleteOrderSuccess = createAction(
  OrderActionTypes.DeleteOrderSuccess,
  props<{ id: number }>()
);
export const deleteOrderFail = createAction(OrderActionTypes.DeleteOrderFail);
export const loadOrder = createAction(
  OrderActionTypes.LoadOrder,
  props<{ id: number }>()
);

export const loadOrderSuccess = createAction(
  OrderActionTypes.LoadOrderSuccess,
  props<{ order: Order }>()
);
export const LoadOrderFail = createAction(OrderActionTypes.LoadOrderFail);
export const loadOrdersView = createAction(OrderActionTypes.LoadOrdersView);
export const loadOrders = createAction(OrderActionTypes.LoadOrders);
export const loadOrdersSuccess = createAction(
  OrderActionTypes.LoadOrdersSuccess,
  props<{ orders: Order[] }>()
);
export const LoadOrdersFail = createAction(OrderActionTypes.LoadOrdersFail);

export const selectOrder = createAction(
  OrderActionTypes.SelectOrder,
  props<{ order: Order }>()
);

export const updateOrder = createAction(
  OrderActionTypes.UpdateOrder,
  props<{ order: Order }>()
);
export const updateOrderFail = createAction(OrderActionTypes.UpdateOrderFail);
export const updateOrderSuccess = createAction(
  OrderActionTypes.UpdateOrderSuccess,
  props<{ order: Update<Order> }>()
);
export const updateLineItemsAndOrder = createAction(
  OrderActionTypes.UpdateLineItemsAndOrder,
  props<{ lineItems: LineItem[]; order: Order }>()
);
export const updateLineItemsAndOrderSuccess = createAction(
  OrderActionTypes.UpdateLineItemsAndOrderSuccess,
  props<{ lineItems: LineItem[]; order: Order }>()
);
export const updateLineItemsAndOrderFail = createAction(
  OrderActionTypes.UpdateLineItemsAndOrderFail,
  props<{ error: Error }>()
);
export const openOrderValidationDialog = createAction(
  OrderActionTypes.OpenOrderValidationDialog,
  props<{ validations: Validation[] }>()
);
export const closeOrderValidationDialog = createAction(
  OrderActionTypes.CloseOrderValidationDialog
);
