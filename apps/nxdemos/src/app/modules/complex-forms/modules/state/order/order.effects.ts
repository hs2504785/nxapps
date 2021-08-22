import { Injectable } from '@angular/core';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  addOrder,
  addOrderFail,
  addOrderSuccess,
  closeOrderValidationDialog,
  loadOrder,
  LoadOrderFail,
  loadOrders,
  loadOrdersSuccess,
  loadOrderSuccess,
  loadOrdersView,
  openOrderValidationDialog,
  updateLineItemsAndOrder,
  updateOrder,
  updateOrderFail,
  updateOrderSuccess,
} from './order.actions';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';

import { Order } from './order.model';
import { OrderService } from '../../orders/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import {
  deleteLineItem,
  loadLineItems,
  upsertLineItems,
} from '../line-item/line-item.actions';
import { loadProducts } from '../product/product.actions';
import { loadCustomers } from '../customer/customer.actions';
import { ValidationDialogComponent } from '../../../shared/dialogs/validation-dialog/validation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Injectable()
export class OrderEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addOrder),
      filter((action) => !action.order.id),
      switchMap(({ order }) => {
        return this.service.save(order);
      }),
      map(({ lineItems, order }) => addOrderSuccess({ lineItems, order })),
      catchError(() => of(LoadOrderFail()))
    );
  });

  closeValidationDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(closeOrderValidationDialog),
        tap(() => {
          this.matDialog.closeAll();
        })
      );
    },
    { dispatch: false }
  );

  deleteLineItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateLineItemsAndOrder),
      filter(
        (payload) =>
          !!payload.order &&
          !!payload.order.lineItemIds &&
          payload.order.lineItemIds.length > 0
      ),
      map((payload) =>
        payload.order.lineItemIds.filter(
          (id) =>
            payload.lineItems.map((lineItem) => lineItem.id).indexOf(id) === -1
        )
      ),
      filter((ids) => !!ids.length),
      switchMap((ids) => ids.map((id) => deleteLineItem({ id })))
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrders),
      exhaustMap(() => this.service.getOrders()),
      map((orders: Order[]) => loadOrdersSuccess({ orders })),
      catchError(() => of(addOrderFail()))
    );
  });

  loadOrdersView$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrdersView),
      mergeMap(() => [
        loadOrders(),
        loadCustomers(),
        loadProducts(),
        loadLineItems(),
      ])
    );
  });

  loadById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrder),
      exhaustMap(({ id }) => this.service.getOrder(+id)),
      map((order: any) => loadOrderSuccess({ order })),
      catchError(() => of(LoadOrderFail()))
    );
  });

  openValidationDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(openOrderValidationDialog),
        tap((action) =>
          this.matDialog.open(ValidationDialogComponent, {
            data: {
              validations: action.validations,
            },
          })
        )
      );
    },
    { dispatch: false }
  );

  showSnackBarAfterUpdate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updateOrderSuccess),
        tap(() =>
          this.matSnackBar.open('Order Saved.', 'Success', { duration: 2000 })
        )
      );
    },
    { dispatch: false }
  );

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateOrder),
      exhaustMap(({ order }) => this.service.save(order)),
      map((order) =>
        updateOrderSuccess({
          order: {
            id: order.id,
            changes: order,
          },
        })
      ),
      catchError(() => of(updateOrderFail()))
    );
  });

  upsertLineItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateLineItemsAndOrder, addOrderSuccess),
      map((payload) => upsertLineItems(payload)),
      catchError(() => of(updateOrderFail()))
    );
  });

  constructor(
    private actions$: Actions,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private service: OrderService
  ) {}
}
