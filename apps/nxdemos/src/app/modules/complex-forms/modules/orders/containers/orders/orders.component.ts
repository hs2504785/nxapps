import { Component } from '@angular/core';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  // orders$: Observable<OrderView[]>;
  // constructor(private router: Router, private store: Store<AppState>) {}
  // ngOnInit() {
  //   this.store.dispatch(new LoadOrdersView());
  //   const orders$ = this.store.pipe(select(fromStore.getAllOrders)),
  //     customers$ = this.store.pipe(
  //       select(fromCustomerStore.getCustomerEntities)
  //     ),
  //     lineItems$ = this.store.pipe(
  //       select(fromLineItemStore.getLineItemEntities)
  //     ),
  //     products$ = this.store.pipe(select(fromProductStore.getProductEntities));
  //   this.orders$ = orders$.pipe(
  //     combineLatest(customers$, lineItems$, products$),
  //     filter(
  //       ([orders, customers, lineItems, products]) =>
  //         !!orders && !!customers && !!lineItems && !!products
  //     ),
  //     map(([orders, customers, lineItems, products]) => {
  //       return orders.map((order) => {
  //         const c: Customer = customers[order.customerId],
  //           l: LineItem[] = [],
  //           p: Product[] = [];
  //         // find the line items
  //         order.lineItemIds.forEach((id) => {
  //           if (lineItems[id]) {
  //             l.push(lineItems[id]);
  //           }
  //         });
  //         // find the products
  //         l.forEach((lineItem) => {
  //           if (products[lineItem.productId]) {
  //             p.push(products[lineItem.productId]);
  //           }
  //         });
  //         return { order: order, customer: c, lineItems: l, products: p };
  //       });
  //     })
  //   );
  // }
  // onAddOrder() {
  //   this.store.dispatch(new ClearSelectedOrder());
  //   this.router.navigateByUrl('/orders/add');
  // }
  // onDeleteOrder(order: Order) {
  //   this.store.dispatch(new DeleteOrder({ id: order.id }));
  // }
  // onEditOrder(order: Order) {
  //   this.store.dispatch(new SelectOrder({ order: order }));
  //   this.router.navigate(['orders', order.id]);
  // }
}
