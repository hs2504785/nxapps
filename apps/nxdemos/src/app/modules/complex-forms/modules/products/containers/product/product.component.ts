import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../../state/product/product.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../state/app.interfaces';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
  addProduct,
  loadProduct,
  updateProduct,
} from '../../../state/product/product.actions';
import { getSelectedProduct } from '../../../state/product/product.selectors';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product$: Observable<any>;

  private product: Product;
  private valid: boolean;
  showErrors = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.product$ = this.activatedRoute.paramMap.pipe(
      filter((params) => params.has('id')),
      map((params) => params.get('id')),
      tap((id) => this.store.dispatch(loadProduct({ id: id ? +id : 1 }))),
      switchMap(() => this.store.pipe(select(getSelectedProduct)))
    );

    this.showErrors = false;
  }

  onProductChange(value: { product: Product; valid: boolean }) {
    this.product = value.product;
    this.valid = value.valid;
  }

  onSave() {
    this.showErrors = true;

    if (this.valid) {
      if (this.product.id) {
        this.updateProduct(this.product);
      } else {
        this.addProduct(this.product);
      }
    }
  }

  private addProduct(product: Product) {
    this.store.dispatch(addProduct({ product: product }));
  }

  private updateProduct(product: Product) {
    const update: any = {
      id: product.id,
      changes: product,
    };
    this.store.dispatch(updateProduct({ product: update }));
  }
}
