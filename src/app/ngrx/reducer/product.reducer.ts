import { Product } from '../../core/api/products/product';
import { createReducer, on } from '@ngrx/store';
import { addProduct, editProduct, removeProduct, retrievedProductList } from '../actions/product.actions';


export const initialState: Product[] = [];

export const productReducer = createReducer(
  initialState,
  on(retrievedProductList, (state, {productList}) => [...productList]),
  on(removeProduct, (state, {product}) => state.filter((value) => value !== product)),
  on(addProduct, (state, {product}) => [...state, product]),
  on(editProduct, (state, {product}) => {
    const clone = [...state];
    clone[state.findIndex((value: Product) => value.id === product.id)] = product;
    return clone;
  })
);
