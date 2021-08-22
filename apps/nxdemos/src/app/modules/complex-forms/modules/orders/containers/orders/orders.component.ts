import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { Order, OrderView } from '../../../state/order/order.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../state/app.interfaces';
import {
  clearSelectedOrder,
  deleteOrder,
  loadOrdersView,
  selectOrder,
} from '../../../state/order/order.actions';
import { getProductEntities } from '../../../state/product/product.selectors';
import { filter, map } from 'rxjs/operators';
import { Customer } from '../../../state/customer/customer.model';
import { LineItem } from '../../../state/line-item/line-item.model';
import { Product } from '../../../state/product/product.model';
import { getAllOrders } from '../../../state/order/order.selectors';
import { getLineItemEntities } from '../../../state/line-item/line-item.selectors';
import { getCustomerEntities } from '../../../state/customer/customer.selectors';
@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderView[] | any>;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadOrdersView());
    const orders1$ = this.store.pipe(select(getAllOrders)),
      customers$ = this.store.pipe(select(getCustomerEntities)),
      lineItems$ = this.store.pipe(select(getLineItemEntities)),
      products$ = this.store.pipe(select(getProductEntities));

    this.orders$ = combineLatest([
      orders1$,
      customers$,
      lineItems$,
      products$,
    ]).pipe(
      filter(
        ([orders, customers, lineItems, products]) =>
          !!orders && !!customers && !!lineItems && !!products
      ),
      map(([orders, customers, lineItems, products]) => {
        return orders.map((order: Order) => {
          const c: Customer | undefined = customers[order.customerId],
            l: LineItem[] = [],
            p: Product[] = [];
          // find the line items
          order.lineItemIds.forEach((id) => {
            if (lineItems[id]) {
              // l.push(lineItems[id]);
            }
          });
          // find the products
          l.forEach((lineItem) => {
            if (products[lineItem.productId]) {
              // p.push(products[lineItem.productId]);
            }
          });
          return { order: order, customer: c, lineItems: l, products: p };
        });
      })
    );
  }
  onAddOrder() {
    this.store.dispatch(clearSelectedOrder());
    this.router.navigateByUrl('orders/add');
  }
  onDeleteOrder(order: Order) {
    this.store.dispatch(deleteOrder({ id: order.id }));
  }
  onEditOrder(order: Order) {
    this.store.dispatch(selectOrder({ order: order }));
    this.router.navigate(['orders', order.id]);
  }
}
