import { Update } from '@ngrx/entity';
import { LineItem } from './line-item.model';
import { createAction, props } from '@ngrx/store';

export enum LineItemActionTypes {
  AddLineItem = '[LineItem] Add LineItem',
  AddLineItemSuccess = '[LineItem] Add LineItem Success',
  AddLineItemFail = '[LineItem] Add LineItemFail',
  DeleteLineItem = '[LineItem] Delete LineItem',
  DeleteLineItemSuccess = '[LineItem] Delete LineItem Success',
  DeleteLineItemFail = '[LineItem] Delete LineItem Fail',
  LoadLineItem = '[LineItem] Load LineItem',
  LoadLineItemSuccess = '[LineItem] Load LineItem Success',
  LoadLineItemFail = '[LineItem] Load LineItem Fail',
  LoadLineItems = '[LineItem] Load LineItems',
  LoadLineItemsSuccess = '[LineItem] Load LineItems Success',
  LoadLineItemsFail = '[LineItem] Load LineItems Fail',
  UpsertLineItems = '[LineItem] Upsert LineItems',
  UpsertLineItemsSuccess = '[LineItem] Upsert LineItems Success',
  UpsertLineItemsFail = '[LineItem] Upsert LineItems Fail',
}

export const addLineItem = createAction(
  LineItemActionTypes.AddLineItem,
  props<{ lineItems: LineItem }>()
);

export const addLineItemSuccess = createAction(
  LineItemActionTypes.AddLineItemSuccess,
  props<{ lineItem: LineItem }>()
);

export const addLineItemFail = createAction(
  LineItemActionTypes.AddLineItemFail
);

export const deleteLineItem = createAction(
  LineItemActionTypes.DeleteLineItem,
  props<{ id: number }>()
);

export const deleteLineItemSuccess = createAction(
  LineItemActionTypes.DeleteLineItemSuccess,
  props<{ id: number }>()
);

export const deleteLineItemFail = createAction(
  LineItemActionTypes.DeleteLineItemFail
);

export const loadLineItem = createAction(
  LineItemActionTypes.LoadLineItem,
  props<{ id: number }>()
);
export const loadLineItemSuccess = createAction(
  LineItemActionTypes.LoadLineItemSuccess,
  props<{ lineItem: LineItem }>()
);
export const loadLineItemFail = createAction(
  LineItemActionTypes.LoadLineItemFail
);

export const loadLineItems = createAction(LineItemActionTypes.LoadLineItems);
export const loadLineItemsSuccess = createAction(
  LineItemActionTypes.LoadLineItemsSuccess,
  props<{ lineItems: LineItem[] }>()
);
export const loadLineItemsFail = createAction(
  LineItemActionTypes.LoadLineItemsFail
);
export const upsertLineItems = createAction(
  LineItemActionTypes.UpsertLineItems,
  props<{ lineItems: LineItem[]; order: Order }>()
);
export const upsertLineItemsSuccess = createAction(
  LineItemActionTypes.UpsertLineItemsSuccess,
  props<{ lineItems: Update<LineItem>[]; order: Order }>()
);
export const upsertLineItemsFail = createAction(
  LineItemActionTypes.UpsertLineItemsFail
);
