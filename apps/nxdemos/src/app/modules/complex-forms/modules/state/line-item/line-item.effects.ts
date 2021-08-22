import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { LineItemService } from '../../../../../core/services/line-item.service';
import { updateOrder } from '../order/order.actions';
import {
  deleteLineItem,
  deleteLineItemFail,
  deleteLineItemSuccess,
  loadLineItem,
  loadLineItemFail,
  loadLineItems,
  loadLineItemsFail,
  loadLineItemsSuccess,
  loadLineItemSuccess,
  upsertLineItems,
  upsertLineItemsFail,
  upsertLineItemsSuccess,
} from './line-item.actions';
import { LineItem } from './line-item.model';

@Injectable()
export class LineItemEffects {
  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteLineItem),
      map((action) => action.id),
      exhaustMap((id) => this.service.delete(id)),
      map((id) => deleteLineItemSuccess({ id })),
      catchError(() => of(deleteLineItemFail()))
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLineItems),
      exhaustMap(() => this.service.getLineItems()),
      map((lineItems: LineItem[]) =>
        loadLineItemsSuccess({ lineItems: lineItems })
      ),
      catchError(() => of(loadLineItemsFail()))
    );
  });

  loadById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLineItem),
      exhaustMap((action) => this.service.getLineItem(action.id)),
      map((lineItem: LineItem) => loadLineItemSuccess({ lineItem: lineItem })),
      catchError(() => of(loadLineItemFail()))
    );
  });

  upsertLineItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(upsertLineItems),
      mergeMap((payload) =>
        forkJoin(
          payload.lineItems.map((lineItem) => this.service.save(lineItem))
        ).pipe(
          map((lineItems) =>
            lineItems.map((lineItem) => ({
              id: lineItem.id,
              changes: lineItem,
            }))
          ),
          map((updates) =>
            upsertLineItemsSuccess({
              lineItems: updates,
              order: payload.order,
            })
          ),
          catchError(() => of(upsertLineItemsFail()))
        )
      )
    );
  });

  updateOrderFromLineItemsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(upsertLineItemsSuccess),
      map((action) => ({
        ...action.order,
        lineItemIds: action.lineItems.map((lineItem) => +lineItem.id),
      })),
      map((order) => updateOrder({ order }))
    );
  });

  constructor(private actions$: Actions, private service: LineItemService) {}
}
