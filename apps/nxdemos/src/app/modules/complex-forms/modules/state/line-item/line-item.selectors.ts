import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getSelectedOrder } from '../order/order.selectors';
import { lineItemAdapter, LineItemsState } from './line-item.reducer';

export const getLineItemsState =
  createFeatureSelector<LineItemsState>('lineItem');

export const getSelectedId = (state: LineItemsState) =>
  state.selectedLineItemId;
export const getLoading1 = (state: LineItemsState) => state.loading;
export const getError1 = (state: LineItemsState) => state.error;

export const {
  selectIds: getLineItemIds,
  selectEntities: getLineItemEntities,
  selectAll: getAllLineItems,
  selectTotal: getTotalLineItems,
} = lineItemAdapter.getSelectors(getLineItemsState);

export const getSelectedCustomerId = createSelector(
  getLineItemsState,
  getSelectedId
);

export const getLoading = createSelector(getLineItemsState, getLoading1);

export const getError = createSelector(getLineItemsState, getError1);

export const getOrderLineItems = createSelector(
  getAllLineItems,
  getSelectedOrder,
  (lineItems, order) =>
    order &&
    lineItems.filter(
      (lineItem) => order.lineItemIds.indexOf(lineItem.id) !== -1
    )
);
