import { Injectable } from '@angular/core';

@Injectable()
export class CustomerEffects {
  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(CustomerActionTypes.LoadCustomers)
    .pipe(
      switchMap(() => this.service.getCustomers()),
      map(
        (customers: Customer[]) =>
          new LoadCustomersSuccess({ customers: customers })
      ),
      catchError((err) => of(new LoadCustomersFail()))
    );

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadCustomer>(CustomerActionTypes.LoadCustomer)
    .pipe(
      switchMap((action) => this.service.getCustomer(action.payload.id)),
      map(
        (customer: Customer) => new LoadCustomerSuccess({ customer: customer })
      ),
      catchError((err) => of(new LoadCustomerFail()))
    );

  constructor(private actions$: Actions, private service: CustomerService) {}
}
