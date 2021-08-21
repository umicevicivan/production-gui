import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/products/product';
import { select, Store } from '@ngrx/store';
import { ProductsService } from '../../api/products/products.service';
import { AlertifyService } from '../../../shared/util/services/alertify.service';
import { Router } from '@angular/router';
import { removeProduct } from '../../../ngrx/actions/product.actions';
import { selectProducts } from '../../../ngrx/selectors/product.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  headElements = ['ID', 'Name', 'Professional Name', 'Shape', 'Description', 'Instruction', 'Price', 'Unit Of Measure', 'Action'];

  products$ = this.store.pipe(select(selectProducts));

  constructor(private store: Store<{ products: Product[] }>, private productsService: ProductsService,
              private alertify: AlertifyService, private router: Router) {
  }

  ngOnInit(): void {
  }

  openForAdding() {
    this.router.navigate(['products/add']);
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.alertify.success('Product is deleted');
      this.store.dispatch(removeProduct({product}));
    }, error => {
      this.alertify.error(error);
    });

  }

}
