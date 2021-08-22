import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  addLineItemSuccess,
  deleteLineItemSuccess,
  LineItemActionTypes,
  loadLineItem,
  loadLineItemFail,
  loadLineItems,
  loadLineItemsFail,
  loadLineItemsSuccess,
  loadLineItemSuccess,
  upsertLineItemsSuccess,
} from './line-item.actions';
import { LineItem } from './line-item.model';
import { createReducer, on } from '@ngrx/store';

export interface LineItemsState extends EntityState<LineItem> {
  // additional entities state properties
  selectedLineItemId: number;
  loading: boolean;
  error: string;
}

export const lineItemAdapter: EntityAdapter<LineItem> =
  createEntityAdapter<LineItem>();

export const initialState: LineItemsState = lineItemAdapter.getInitialState({
  // additional entity state properties
  selectedLineItemId: 0,
  loading: false,
  error: '',
});

export const lineItemReducer = createReducer(
  initialState,
  on(
    addLineItemSuccess,
    (state, action): LineItemsState =>
      lineItemAdapter.addOne(action.lineItem, state)
  ),
  on(
    deleteLineItemSuccess,
    (state, action): LineItemsState =>
      lineItemAdapter.removeOne(action.id, state)
  ),
  on(loadLineItem, (state, action): LineItemsState => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(loadLineItemSuccess, (state, action): LineItemsState => {
    return {
      ...lineItemAdapter.addOne(action.lineItem, state),
      loading: false,
    };
  }),
  on(loadLineItemFail, (state): LineItemsState => {
    return {
      ...state,
      loading: false,
      error: 'error loading line item',
    };
  }),
  on(loadLineItems, (state): LineItemsState => {
    return {
      ...lineItemAdapter.removeAll(state),
      loading: true,
      error: '',
    };
  }),
  on(loadLineItemsSuccess, (state, action): LineItemsState => {
    return {
      ...lineItemAdapter.addMany(action.lineItems, state),
      loading: false,
    };
  }),
  on(loadLineItemsSuccess, (state, action): LineItemsState => {
    return {
      ...lineItemAdapter.addMany(action.lineItems, state),
      loading: false,
    };
  }),
  on(loadLineItemsFail, (state): LineItemsState => {
    return {
      ...state,
      loading: false,
      error: 'error loading line items',
    };
  })
  // on(
  //   upsertLineItemsSuccess,
  //   (state, action): LineItemsState => lineItemAdapter.upsertMany(action.lineItems, state);
  // )
);
