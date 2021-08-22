import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { Order } from '../../state/order/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = `${environment.API_URL}/orders`; // URL to web api

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  getOrder(id: number) {
    return this.getOrders().pipe(
      map((orders) => orders.find((order) => order.id === id))
    );
  }

  save(order: Order) {
    if (order.id) {
      return this.put(order);
    }
    return this.post(order);
  }

  delete(id: number): Observable<number> {
    return this.http
      .delete<void>(`${this.ordersUrl}/${id}`)
      .pipe(switchMap(() => of(id)));
  }

  // Add new Order
  private post(order: Order): Observable<Order> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.http.post<Order>(this.ordersUrl, order);
  }

  // Update existing Order
  private put(order: Order): Observable<Order> {
    return this.http
      .put<void>(`${this.ordersUrl}/${order.id}`, order)
      .pipe(switchMap(() => of(order)));
  }
}
