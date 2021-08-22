import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from './customer.model';
import {
  addCustomer,
  addCustomers,
  clearCustomers,
  CustomerActionTypes,
  deleteCustomer,
  deleteCustomers,
  loadCustomer,
  loadCustomerFail,
  loadCustomers,
  loadCustomersFail,
  loadCustomersSuccess,
  loadCustomerSuccess,
  updateCustomer,
  updateCustomers,
  upsertCustomer,
  upsertCustomers,
} from './customer.actions';
import { createReducer, on } from '@ngrx/store';

export interface CustomerState extends EntityState<Customer> {
  // additional entities state properties
  selectedCustomerId: number;
  loading: boolean;
  error: string;
}

export const customerAdapter: EntityAdapter<Customer> =
  createEntityAdapter<Customer>();

export const initialState: CustomerState = customerAdapter.getInitialState({
  // additional entity state properties
  selectedCustomerId: 0,
  loading: false,
  error: '',
});

export const customerReducer = createReducer(
  initialState,
  on(
    addCustomer,
    (state, action): CustomerState =>
      customerAdapter.addOne(action.customer, state)
  ),
  on(
    upsertCustomer,
    (state, action): CustomerState =>
      customerAdapter.upsertOne(action.customer, state)
  ),
  on(
    addCustomers,
    (state, action): CustomerState =>
      customerAdapter.addMany(action.customers, state)
  ),
  on(
    upsertCustomers,
    (state, action): CustomerState =>
      customerAdapter.upsertMany(action.customers, state)
  ),
  on(
    updateCustomer,
    (state, action): CustomerState =>
      customerAdapter.updateOne(action.customer, state)
  ),

  on(
    updateCustomers,
    (state, action): CustomerState =>
      customerAdapter.upsertMany(action.customers, state)
  ),
  on(
    deleteCustomer,
    (state, action): CustomerState =>
      customerAdapter.removeOne(action.id, state)
  ),
  on(
    deleteCustomers,
    (state, action): CustomerState =>
      customerAdapter.removeMany(action.ids, state)
  ),
  on(loadCustomers, (state, action): CustomerState => {
    return {
      ...customerAdapter.removeAll(state),
      loading: true,
      error: '',
    };
  }),
  on(loadCustomersSuccess, (state, action): CustomerState => {
    return {
      ...customerAdapter.addMany(action.customers, state),
      loading: false,
    };
  }),

  on(loadCustomersFail, (state): CustomerState => {
    return {
      ...state,
      loading: false,
      error: 'error loading customers',
    };
  }),
  on(loadCustomer, (state): CustomerState => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(loadCustomerSuccess, (state, action): CustomerState => {
    return {
      ...customerAdapter.addOne(action.customer, state),
      loading: false,
    };
  }),
  on(loadCustomerFail, (state): CustomerState => {
    return {
      ...state,
      loading: false,
      error: 'error loading customer',
    };
  }),
  on(clearCustomers, (state): CustomerState => customerAdapter.removeAll(state))
);
