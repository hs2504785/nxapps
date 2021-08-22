import { createSelector, createFeatureSelector } from '@ngrx/store';
import { orderAdapter, OrderState } from './order.reducer';

export const getOrdersState = createFeatureSelector<OrderState>('order');

export const getSelectedId = (state: OrderState) => state.selectedOrderId;
export const getLoading1 = (state: OrderState) => state.loading;
export const getError1 = (state: OrderState) => state.error;

export const {
  selectAll: getAllOrders,
  selectEntities: getOrderEntities,
  selectIds: getOrderIds,
  selectTotal: getTotalOrders,
} = orderAdapter.getSelectors(getOrdersState);

export const getSelectedOrderId = createSelector(getOrdersState, getSelectedId);

export const getSelectedOrder = createSelector(
  getSelectedOrderId,
  getOrderEntities,
  (selectedOrderId, entities) => selectedOrderId && entities[selectedOrderId]
);

export const getLoading = createSelector(getOrdersState, getLoading1);

export const getError = createSelector(getOrdersState, getError1);
