import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnnualPlan } from '../api/annual-plan/annual-plan';
import { AnnualPlansService } from '../api/annual-plan/annual-plans.service';
import { AlertifyService } from '../../shared/util/services/alertify.service';

@Injectable()
export class AnnualPlanEditResolver implements Resolve<AnnualPlan> {
  constructor(
    private planService: AnnualPlansService, private router: Router, private alertify: AlertifyService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<AnnualPlan> {
    return this.planService.getPlan(route.params.id).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving your data');
        this.router.navigate(['/annualPlan']);
        return of(null);
      })
    );
  }
}
