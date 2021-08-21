import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../api/products/product';
import { AlertifyService } from '../../shared/util/services/alertify.service';
import { ProductsService } from '../api/products/products.service';


@Injectable()
export class ProductEditResolver implements Resolve<Product> {

  constructor(private productService: ProductsService, private router: Router,
              private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    return this.productService.getProduct(route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data');
        this.router.navigate(['/products']);
        return of(null);
      })
    );
  }

}
