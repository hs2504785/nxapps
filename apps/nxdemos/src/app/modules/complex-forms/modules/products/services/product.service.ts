import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../../state/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = `${environment.API_URL}/products`; // URL to web api

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number) {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }

  save(product: Product) {
    if (product.id) {
      return this.put(product);
    }
    return this.post(product);
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;

    return this.httpClient.delete<Product>(url);
  }

  // Add new Product
  private post(product: Product): Observable<Product> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.httpClient.post<Product>(this.productsUrl, product);
  }

  // Update existing Product
  private put(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;

    return this.httpClient.put<Product>(url, product);
  }
}
