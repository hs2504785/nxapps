import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../../../../../../app/core/services/customer.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadCustomer,
  loadCustomerFail,
  loadCustomers,
  loadCustomersFail,
  loadCustomersSuccess,
  loadCustomerSuccess,
} from './customer.actions';
import { Customer } from './customer.model';

@Injectable()
export class CustomerEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCustomers),
      switchMap(() => this.service.getCustomers()),
      map((customers: Customer[]) =>
        loadCustomersSuccess({ customers: customers })
      ),
      catchError(() => of(loadCustomersFail()))
    );
  });

  loadById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCustomer),
      switchMap((action) => this.service.getCustomer(action.id)),
      map((customer: Customer) => loadCustomerSuccess({ customer: customer })),
      catchError(() => of(loadCustomerFail()))
    );
  });

  constructor(private actions$: Actions, private service: CustomerService) {}
}
