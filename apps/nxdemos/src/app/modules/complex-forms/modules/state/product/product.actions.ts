import { Update } from '@ngrx/entity';
import { Product } from './product.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadProductsSuccess = '[Product] Load Products Success',
  LoadProductsFail = '[Product] Load Products Fail',
  LoadProduct = '[Product] Load Product',
  LoadProductSuccess = '[Product] Load Product Success',
  LoadProductFail = '[Product] Load Product Fail',
  SelectProduct = '[Product] Select product',
  AddProduct = '[Product] Add Product',
  AddProductFail = '[Product] Add Product Fail',
  AddProductSuccess = '[Product] Add Product Success',
  UpsertProduct = '[Product] Upsert Product',
  AddProducts = '[Product] Add Products',
  UpsertProducts = '[Product] Upsert Products',
  UpdateProduct = '[Product] Update Product',
  UpdateProductFail = '[Product] Update Product Fail',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProducts = '[Product] Update Products',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductFail = '[Product] Delete Product Fail',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProducts = '[Product] Delete Products',
  ClearProducts = '[Product] Clear Products',
}

export const loadProducts = createAction(ProductActionTypes.LoadProducts);
export const loadProductsSuccess = createAction(
  ProductActionTypes.LoadProductsSuccess,
  props<{ products: Product[] }>()
);
export const loadProductsFail = createAction(
  ProductActionTypes.LoadProductsFail
);

export const loadProduct = createAction(
  ProductActionTypes.LoadProduct,
  props<{ id: number }>()
);
export const loadProductSuccess = createAction(
  ProductActionTypes.LoadProductSuccess,
  props<{ product: Product }>()
);

export const loadProductFail = createAction(ProductActionTypes.LoadProductFail);

export const selectProduct = createAction(
  ProductActionTypes.SelectProduct,
  props<{ product: Product }>()
);

export const addProduct = createAction(
  ProductActionTypes.AddProduct,
  props<{ product: Product }>()
);
export const addProductFail = createAction(ProductActionTypes.AddProductFail);
export const addProductSuccess = createAction(
  ProductActionTypes.AddProductSuccess,
  props<{ product: Product }>()
);

export const upsertProduct = createAction(
  ProductActionTypes.UpsertProduct,
  props<{ product: Update<Product> }>()
);

export const addProducts = createAction(
  ProductActionTypes.AddProducts,
  props<{ products: Product[] }>()
);
export const upsertProducts = createAction(
  ProductActionTypes.UpsertProducts,
  props<{ products: Update<Product>[] }>()
);

export const updateProduct = createAction(
  ProductActionTypes.UpdateProduct,
  props<{ product: Update<Product> }>()
);
export const updateProductFail = createAction(
  ProductActionTypes.UpdateProductFail
);
export const updateProductSuccess = createAction(
  ProductActionTypes.UpdateProductSuccess,
  props<{ product: Product }>()
);

export const updateProducts = createAction(
  ProductActionTypes.UpdateProducts,
  props<{ products: Update<Product[]> }>()
);
export const deleteProduct = createAction(
  ProductActionTypes.DeleteProduct,
  props<{ product: Product }>()
);
export const deleteProductFail = createAction(
  ProductActionTypes.DeleteProductFail
);

export const deleteProductSuccess = createAction(
  ProductActionTypes.DeleteProductSuccess,
  props<{ product: Product }>()
);

export const deleteProducts = createAction(
  ProductActionTypes.DeleteProducts,
  props<{ ids: number[] }>()
);

export const clearProducts = createAction(ProductActionTypes.ClearProducts);
