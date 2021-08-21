import { createSelector, createFeatureSelector } from '@ngrx/store';
import { productAdapter, productKey, ProductState } from './product.reducer';

export const getProductsState = createFeatureSelector<ProductState>(productKey);

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = productAdapter.getSelectors(getProductsState);

export const getSelectedId = (state: ProductState) => state.selectedProductId;
export const getLoading = (state: ProductState) => state.loading;
export const getError = (state: ProductState) => state.error;

export const getSelectedProductId = createSelector(
  getProductsState,
  getSelectedId
);

export const getSelectedProduct = createSelector(
  getSelectedProductId,
  getProductEntities,
  (selectedProductId, entities) =>
    selectedProductId && entities[selectedProductId]
);
