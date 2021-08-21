import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductInterface } from './models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<ProductInterface[]>;

  // constructor(private router: Router, private store: Store<AppState>) {}

  // ngOnInit() {
  //   this.store.dispatch(new LoadProducts());
  //   this.products$ = this.store.pipe(select(fromStore.getAllProducts));
  // }

  // onDeleteProduct(product: Product) {
  //   this.store.dispatch(new DeleteProduct({ product: product }));
  // }

  // onEditProduct(product: Product) {
  //   this.store.dispatch(new SelectProduct({ product: product }));
  //   this.router.navigate(['products', product.id]);
  // }
}
