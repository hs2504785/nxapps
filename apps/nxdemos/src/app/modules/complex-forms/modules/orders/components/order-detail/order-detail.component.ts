import { Component, Input } from '@angular/core';
import { Order } from '../../../state/order/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  @Input() order: Order;
}
