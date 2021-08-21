import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertifyService } from '../../../shared/util/services/alertify.service';
import { retrievedProductList } from '../../../ngrx/actions/product.actions';
import { retrievedUnitsOfMeasure } from '../../../ngrx/actions/unitOfMeasure.actions';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../api/products/products.service';
import { UnitsOfMeasureService } from '../../api/units-of-measure/units-of-measure.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};


  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router,
              private store: Store, private productsService: ProductsService,
              private unitsOfMeasureService: UnitsOfMeasureService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user);
  }

}
