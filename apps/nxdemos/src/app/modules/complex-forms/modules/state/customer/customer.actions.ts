import { Update } from '@ngrx/entity';
import { Customer } from './customer.model';
import { createAction, props } from '@ngrx/store';

export enum CustomerActionTypes {
  LoadCustomer = '[Customer] Load Customer',
  LoadCustomerSuccess = '[Customer] Load Customer Success',
  LoadCustomerFail = '[Customer] Load Customer Fail',
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load Customers Success',
  LoadCustomersFail = '[Customer] Load Customers Fail',
  AddCustomer = '[Customer] Add Customer',
  UpsertCustomer = '[Customer] Upsert Customer',
  AddCustomers = '[Customer] Add Customers',
  UpsertCustomers = '[Customer] Upsert Customers',
  UpdateCustomer = '[Customer] Update Customer',
  UpdateCustomers = '[Customer] Update Customers',
  DeleteCustomer = '[Customer] Delete Customer',
  DeleteCustomers = '[Customer] Delete Customers',
  ClearCustomers = '[Customer] Clear Customers',
}

export const loadCustomer = createAction(
  CustomerActionTypes.LoadCustomer,
  props<{ id: number }>()
);

export const loadCustomerSuccess = createAction(
  CustomerActionTypes.LoadCustomerSuccess,
  props<{ customer: Customer }>()
);

export const loadCustomerFail = createAction(
  CustomerActionTypes.LoadCustomerFail
);

export const loadCustomers = createAction(CustomerActionTypes.LoadCustomers);

export const loadCustomersSuccess = createAction(
  CustomerActionTypes.LoadCustomersSuccess,
  props<{ customer: Customer[] }>()
);
export const oadCustomersFail = createAction(
  CustomerActionTypes.LoadCustomersFail
);
export const addCustomer = createAction(
  CustomerActionTypes.AddCustomer,
  props<{ customer: Customer }>()
);
export const upsertCustomer = createAction(
  CustomerActionTypes.UpsertCustomer,
  props<{ customer: Update<Customer> }>()
);
export const addCustomers = createAction(
  CustomerActionTypes.AddCustomers,
  props<{ customers: Customer[] }>()
);
export const upsertCustomers = createAction(
  CustomerActionTypes.UpsertCustomers,
  props<{ customers: Update<Customer>[] }>()
);
export const updateCustomer = createAction(
  CustomerActionTypes.UpdateCustomer,
  props<{ customer: Update<Customer> }>()
);
export const updateCustomers = createAction(
  CustomerActionTypes.UpdateCustomers,
  props<{ customers: Update<Customer>[] }>()
);

export const deleteCustomer = createAction(
  CustomerActionTypes.DeleteCustomer,
  props<{ id: number }>()
);
export const deleteCustomers = createAction(
  CustomerActionTypes.DeleteCustomers,
  props<{ ids: number[] }>()
);
export const clearCustomers = createAction(CustomerActionTypes.ClearCustomers);
