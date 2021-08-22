import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Customer } from '../../../state/customer/customer.model';
import { LineItem } from '../../../state/line-item/line-item.model';
import {
  addOrder,
  loadOrder,
  openOrderValidationDialog,
  updateLineItemsAndOrder,
} from '../../../state/order/order.actions';
import { Order } from '../../../state/order/order.model';
import { OrderState } from '../../../state/order/order.reducer';
import { getSelectedOrder } from '../../../state/order/order.selectors';
import { Product } from '../../../state/product/product.model';
import { clone } from 'ramda';
import { Validation } from '../../../../../../../app/core/interfaces/validation';
import { loadCustomers } from '../../../state/customer/customer.actions';
import {
  getAllCustomers,
  getCustomerBySelectedOrder,
} from '../../../state/customer/customer.selectors';
import { loadLineItems } from '../../../state/line-item/line-item.actions';
import { getOrderLineItems } from '../../../state/line-item/line-item.selectors';
import { loadProducts } from '../../../state/product/product.actions';
import { getAllProducts } from '../../../state/product/product.selectors';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnDestroy, OnInit {
  order$: any;
  customer$: Observable<any>;
  customers$: Observable<any[]>;
  lineItems$: any;
  products$: Observable<any[]>;

  private destroyed$ = new Subject<void>();
  private lineItems: LineItem[];
  private order: Order;
  private validations: Map<AbstractControl, Validation>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<OrderState>
  ) {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.order$ = this.activatedRoute.paramMap.pipe(
      filter((params) => params.has('id')),
      map((params) => params.get('id')),
      tap((id: any) => this.store.dispatch(loadOrder({ id }))),
      switchMap(() => this.store.pipe(select(getSelectedOrder))),
      map((order) => clone(order))
    );

    // get all customers
    this.store.dispatch(loadCustomers());
    this.customers$ = this.store.pipe(select(getAllCustomers));

    this.customer$ = this.store.pipe(select(getCustomerBySelectedOrder));

    // get all line items
    this.store.dispatch(loadLineItems());
    this.lineItems$ = this.store.pipe(select(getOrderLineItems));

    // get all products
    this.store.dispatch(loadProducts());
    this.products$ = this.store.pipe(select(getAllProducts));
  }

  onLineItemsChange(lineItems: LineItem[]) {
    this.lineItems = lineItems;
  }

  onOrderChange(order: Order) {
    this.order = order;
  }

  onValidationsChange(validations: Map<AbstractControl, Validation>) {
    this.validations = validations;
  }

  save() {
    // validate order
    const validations = [];
    if (this.validations && this.validations.size) {
      this.validations.forEach((validation) => {
        if (!validation.valid) {
          validations.push(validation);
        }
      });
    }
    if (!this.lineItems || this.lineItems.length === 0) {
      const validation: Validation = {
        message: 'Orders must have at least one line item.',
        valid: false,
      };
      validations.push(validation);
    }
    if (validations.length) {
      this.store.dispatch(
        openOrderValidationDialog({ validations: validations })
      );
      return;
    }

    // update or add order
    if (this.order.id) {
      this.store.dispatch(
        updateLineItemsAndOrder({
          lineItems: this.lineItems,
          order: this.order,
        })
      );
    } else {
      this.store.dispatch(
        addOrder({ lineItems: this.lineItems, order: this.order })
      );
    }
  }
}
