import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.productionServiceUrl}/products`);
  }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${environment.productionServiceUrl}/products/${id}`);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(`${environment.productionServiceUrl}/products/${id}`, product);
  }

  addProduct(product: Product) {
    return this.http.post(`${environment.productionServiceUrl}/products`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.productionServiceUrl}/products/${id}`);
  }
}
