import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectedOrder } from '../order/order.selectors';
import { customerAdapter, CustomerState } from './customer.reducer';

export const getCustomersState =
  createFeatureSelector<CustomerState>('customer');

export const getSelectedId = (state: CustomerState) => state.selectedCustomerId;
export const getLoading1 = (state: CustomerState) => state.loading;
export const getError1 = (state: CustomerState) => state.error;

export const {
  selectAll: getAllCustomers,
  selectEntities: getCustomerEntities,
  selectIds: getCustomerIds,
  selectTotal: getTotalCustomers,
} = customerAdapter.getSelectors(getCustomersState);

export const getSelectedCustomerId = createSelector(
  getCustomersState,
  getSelectedId
);

export const getLoading = createSelector(getCustomersState, getLoading1);

export const getError = createSelector(getCustomersState, getError1);

// export const getCustomerById = id =>
//   createSelector(getCustomerEntities, customers => customers[id]);

export const getCustomerBySelectedOrder = createSelector(
  getCustomerEntities,
  getSelectedOrder,
  (customers, order) => customers && order && customers[order.customerId]
);
