import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../modules/complex-forms/modules/state/customer/customer.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersUrl = `${environment.API_URL}/customers`; // URL to web api

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<Array<Customer>> {
    return this.httpClient.get<Customer[]>(this.customersUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.getCustomers().pipe(
      map((customers: Customer[]) =>
        customers.find((customer) => customer.id === id)
      )
    );
  }

  save(customer: Customer): Observable<Customer> {
    if (customer.id) {
      return this.put(customer);
    }
    return this.post(customer);
  }

  delete(customer: Customer): Observable<any> {
    const url = `${this.customersUrl}/${customer.id}`;

    return this.httpClient
      .delete<void>(url)
      .pipe(switchMap(() => of(customer)));
  }

  // Add new Customer
  private post(customer: Customer): Observable<Customer> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.httpClient.post<Customer>(this.customersUrl, customer);
  }

  // Update existing Customer
  private put(customer: Customer): Observable<Customer> {
    const url = `${this.customersUrl}/${customer.id}`;

    return this.httpClient
      .put(url, customer)
      .pipe(switchMap(() => of(customer)));
  }
}
