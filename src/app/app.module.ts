import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ProductsComponent } from './core/components/products/products.component';
import { AlertifyService } from './shared/util/services/alertify.service';
import { ProductsAddComponent } from './core/components/products/products-add/products-add.component';
import { ProductEditComponent } from './core/components/products/product-edit/product-edit.component';
import { NavComponent } from './core/components/nav/nav.component';
import { LoginComponent } from './core/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ProductsService } from './core/api/products/products.service';
import { PreventUnsavedChanges } from './shared/util/guards/prevent-unsaved-changes.guard';
import { ErrorInterceptorProvider } from './shared/util/interceptors/error.interceptior';
import { ProductEditResolver } from './core/resolvers/product-edit.resolver';
import { AnnualPlansComponent } from './core/components/annual-plans/annual-plans.component';
import { AnnualPlansAddComponent } from './core/components/annual-plans/annual-plans-add/annual-plans-add.component';
import { AnnualPlansEditComponent } from './core/components/annual-plans/annual-plans-edit/annual-plans-edit.component';
import { AnnualPlanEditResolver } from './core/resolvers/annual-plan-edit.resolver';
import { productReducer } from './ngrx/reducer/product.reducer';
import { unitOfMeasureReducer } from './ngrx/reducer/unitOfMeasure.reducer';
import { authReducer } from './ngrx/reducer/auth.reducer';
import { workerReducer } from './ngrx/reducer/worker.reducer';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { annualPlanReducer } from './ngrx/reducer/annualPlan.reducer';
import { AuthService } from './core/auth/auth.service';
import { WorkersService } from './core/api/workers/workers.service';
import { AnnualPlansService } from './core/api/annual-plan/annual-plans.service';
import { UnitsOfMeasureService } from './core/api/units-of-measure/units-of-measure.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductEditComponent,
    NavComponent,
    LoginComponent,
    AnnualPlansComponent,
    AnnualPlansAddComponent,
    AnnualPlansEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      products: productReducer,
      unitsOfMeasure: unitOfMeasureReducer,
      loggedIn: authReducer,
      workers: workerReducer,
      annualPlans: annualPlanReducer
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:9192'],
        disallowedRoutes: ['http://localhost:9192/production-srv/login']
      }
    }),
    BsDatepickerModule
  ],
  providers: [
    AlertifyService,
    ProductsService,
    PreventUnsavedChanges,
    ErrorInterceptorProvider,
    ProductEditResolver,
    AnnualPlanEditResolver,
    BsDatepickerConfig,
    AuthService,
    WorkersService,
    AnnualPlansService,
    UnitsOfMeasureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
