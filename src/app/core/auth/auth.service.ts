import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { retrievedProductList } from '../../ngrx/actions/product.actions';
import { retrievedUnitsOfMeasure } from '../../ngrx/actions/unitOfMeasure.actions';
import { Store } from '@ngrx/store';
import { ProductsService } from '../api/products/products.service';
import { UnitsOfMeasureService } from '../api/units-of-measure/units-of-measure.service';
import { toggleLogIn } from '../../ngrx/actions/auth.actions';
import { AlertifyService } from '../../shared/util/services/alertify.service';
import { Router } from '@angular/router';
import { WorkersService } from '../api/workers/workers.service';
import { AnnualPlansService } from '../api/annual-plan/annual-plans.service';
import { retrievedWorkers } from '../../ngrx/actions/worker.actions';
import { retrievedAnnualPlanList } from '../../ngrx/actions/annualPlan.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store, private productsService: ProductsService,
              private unitsOfMeasureService: UnitsOfMeasureService, private alertify: AlertifyService, private router: Router,
              private workersService: WorkersService, private annualPlansService: AnnualPlansService) {
  }

  jwtHelper = new JwtHelperService();
  decodedToken: any;

  login(user: any) {
    return this.http.post(`${environment.productionServiceUrl}/login`, user).subscribe((response: any) => {
      if (response) {
        const logIn = true;
        this.store.dispatch(toggleLogIn({logIn}));
        localStorage.setItem('token', response.bearer);
        this.decodedToken = this.jwtHelper.decodeToken(response.bearer);
        this.loadData();
        this.alertify.success('Logged in successfully');
        this.router.navigate(['/products']);
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  loadData(): void {
    this.productsService.getProducts().subscribe(productList => this.store.dispatch(retrievedProductList({productList})));
    this.unitsOfMeasureService.getUnits()
      .subscribe(unitOnMeasureList => this.store.dispatch(retrievedUnitsOfMeasure({unitOnMeasureList})));
    this.workersService.getWorkers().subscribe( workersList => this.store.dispatch(retrievedWorkers({workersList})));
    this.annualPlansService.getPlans().subscribe( annualPlanList => this.store.dispatch(retrievedAnnualPlanList({annualPlanList})));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    const logIn = false;
    if (token === 'undefined' || this.jwtHelper.isTokenExpired(token)) {
      this.store.dispatch(toggleLogIn({logIn}));
      return false;
    }
    return true;
  }
}
