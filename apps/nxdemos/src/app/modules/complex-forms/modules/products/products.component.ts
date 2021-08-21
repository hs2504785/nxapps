import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  deleteProduct,
  loadProducts,
  selectProduct,
} from '../state/product/product.actions';
import { getAllProducts } from '../state/product/product.selectors';
import { Product } from '../state/product/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.pipe(select(getAllProducts));
  }

  onDeleteProduct(product: Product) {
    this.store.dispatch(deleteProduct({ product: product }));
  }

  onEditProduct(product: Product) {
    this.store.dispatch(selectProduct({ product: product }));
    this.router.navigate(['complex-forms/products', product.id]);
  }
}
