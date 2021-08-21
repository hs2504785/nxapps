import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';
import {
  addProduct,
  addProducts,
  clearProducts,
  deleteProduct,
  deleteProducts,
  loadProduct,
  loadProductFail,
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
  loadProductSuccess,
  updateProduct,
  updateProducts,
  upsertProducts,
} from './product.actions';
import { createReducer, on } from '@ngrx/store';

export const productKey = 'product';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  selectedProductId: number;
  loading: boolean;
  error: string;
}

export const productAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>();

export const initialState: ProductState = productAdapter.getInitialState({
  // additional entity state properties
  selectedProductId: 1,
  loading: false,
  error: '',
});

export const productReducer = createReducer(
  initialState,
  on(
    addProduct,
    (state, action): ProductState =>
      productAdapter.addOne(action.product, state)
  ),
  on(addProducts, (state, action) =>
    productAdapter.addMany(action.products, state)
  ),
  // on(upsertProducts, (state, action) =>
  //   productAdapter.upsertMany(action.products, state)
  // ),
  on(updateProduct, (state, action) =>
    productAdapter.updateOne(action.product, state)
  ),
  // on(updateProducts, (state, action) =>
  //   productAdapter.updateMany(action.products, state)
  // ),
  // on(
  //   deleteProduct,
  //   (state, action): ProductState => productAdapter.removeOne(action.product.id, state)
  // ),
  on(
    deleteProducts,
    (state, action): ProductState =>
      productAdapter.removeMany(action.ids, state)
  ),
  on(loadProducts, (state): ProductState => {
    return {
      ...productAdapter.removeAll(state),
      loading: true,
      error: '',
    };
  }),
  on(loadProductsSuccess, (state, action): ProductState => {
    console.log('HHEE', action);
    return {
      ...productAdapter.addMany(action.products, state),
      loading: true,
      error: '',
    };
  }),
  on(loadProductsFail, (state): ProductState => {
    return {
      ...state,
      loading: false,
      error: 'error loading products',
    };
  }),
  on(loadProduct, (state): ProductState => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(loadProductSuccess, (state, action): ProductState => {
    return {
      ...productAdapter.addOne(action.product, state),
      selectedProductId: action.product.id,
      loading: false,
    };
  }),
  on(loadProductFail, (state): ProductState => {
    return {
      ...state,
      loading: false,
      error: 'error loading product',
    };
  }),
  on(loadProductFail, (state): ProductState => {
    return {
      ...state,
      loading: false,
      error: 'error loading product',
    };
  }),
  on(clearProducts, (state): ProductState => productAdapter.removeAll(state))
);
