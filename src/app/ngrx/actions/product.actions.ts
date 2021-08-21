import { createAction, props } from '@ngrx/store';

export const addProduct = createAction(
  '[Product List] Add Product',
  props<{ product }>()
);

export const removeProduct = createAction(
  '[Product Collection] Remove Product',
  props<{ product }>()
);

export const editProduct = createAction(
  '[Product List] Edit Product in list',
  props<{ product }>()
);

export const retrievedProductList = createAction(
  '[Product List/API] Retrieved Products Success',
  props<{ productList }>()
);

