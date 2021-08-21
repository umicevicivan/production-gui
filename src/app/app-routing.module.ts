import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './core/components/products/products.component';
import { ProductsAddComponent } from './core/components/products/products-add/products-add.component';
import { PreventUnsavedChanges } from './shared/util/guards/prevent-unsaved-changes.guard';
import { ProductEditComponent } from './core/components/products/product-edit/product-edit.component';
import { ProductEditResolver } from './core/resolvers/product-edit.resolver';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AnnualPlansComponent } from './core/components/annual-plans/annual-plans.component';
import { AnnualPlansAddComponent } from './core/components/annual-plans/annual-plans-add/annual-plans-add.component';
import { AnnualPlansEditComponent } from './core/components/annual-plans/annual-plans-edit/annual-plans-edit.component';
import { AnnualPlanEditResolver } from './core/resolvers/annual-plan-edit.resolver';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'products', component: ProductsComponent},
      {path: 'products/add', component: ProductsAddComponent, canDeactivate: [PreventUnsavedChanges]},
      {
        path: 'products/edit/:id',
        component: ProductEditComponent,
        resolve: {product: ProductEditResolver},
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'annualPlan',
        component: AnnualPlansComponent,
      },
      {path: 'annualPlan/add', component: AnnualPlansAddComponent, canDeactivate: [PreventUnsavedChanges]},
      {
        path: 'annualPlan/edit/:id',
        resolve: {annualPlan: AnnualPlanEditResolver},
        component: AnnualPlansEditComponent,
        canDeactivate: [PreventUnsavedChanges]
      }
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
