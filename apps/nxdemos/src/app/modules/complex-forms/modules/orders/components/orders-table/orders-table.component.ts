import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Order, OrderView } from '../../../state/order/order.model';
import { Product } from '../../../state/product/product.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent {
  displayedColumns = ['id', 'customer', 'total', 'actions'];
  @Input() ordersView: Array<OrderView>;
  @Output() delete = new EventEmitter<Order>();
  @Output() edit = new EventEmitter<Order>();

  computeOrderTotal(orderView: OrderView): number {
    if (!orderView.lineItems.length) {
      return 0;
    }

    // using the order view, calculate the product price * lineItem qty
    return orderView.lineItems
      .map((lineItem: any) => {
        const p: any = orderView.products.find(
            (product: any) => product.id === lineItem.productId
          ),
          price = p.price;

        return lineItem.quantity * price;
      })
      .reduce((prev: any, current: any) => prev + current);
  }

  getProductPrice(orderView: OrderView, id: number) {
    const data: any = orderView.products.find(
      (product: Product) => product.id === id
    );

    return data.price;
  }

  onDeleteOrder(order: Order) {
    this.delete.emit(order);
  }

  onEditOrder(order: Order) {
    this.edit.emit(order);
  }
}
