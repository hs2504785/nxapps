import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { createEffect, ofType } from '@ngrx/effects';

import { Product } from './product.model';
import {
  addProduct,
  addProductFail,
  addProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
  loadProduct,
  loadProductFail,
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
  loadProductSuccess,
  updateProduct,
} from './product.actions';
import { ProductService } from '../../products/services/product.service';
import { AppState } from '../app.interfaces';
import { of } from 'rxjs';
// import { getSelectedProduct } from './product.selectors';

@Injectable()
export class ProductEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProduct),
      switchMap(({ product }) => {
        return this.service.save(product).pipe(
          map((product: Product) => {
            return addProductSuccess({ product });
          }),
          catchError(() => of(addProductFail()))
        );
      })
    );
  });

  addSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addProductSuccess),
        tap(() => this.router.navigate(['products']))
      );
    },
    { dispatch: false }
  );

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProduct),
      switchMap(({ product }) => {
        return this.service.delete(product).pipe(
          map((product: Product) => {
            return deleteProductSuccess({ product });
          }),
          catchError(() => of(deleteProductFail()))
        );
      })
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        return this.service.getProducts().pipe(
          map((products: Product[]) => {
            return loadProductsSuccess({ products });
          }),
          catchError(() => of(loadProductsFail()))
        );
      })
    );
  });

  loadById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProduct),
      switchMap(({ id }) => {
        return this.service.getProduct(+id).pipe(
          map((product: any) => {
            return loadProductSuccess({ product });
          }),
          catchError(() => of(loadProductFail()))
        );
      })
    );
  });

  // update$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updateProduct),
  //     withLatestFrom(getSelectedProduct),
  //     switchMap(([action, product]) => {
  //       return this.service.save(product);
  //     }),
  //     map((product: Product) => {
  //       return loadProductSuccess({ product });
  //     }),
  //     catchError(() => of(loadProductFail()))
  //   );
  // });

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: ProductService,
    private store: Store<AppState>
  ) {}
}
