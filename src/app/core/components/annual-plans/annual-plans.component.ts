import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAnnualPlans } from '../../../ngrx/selectors/annualPlan.selector';
import { removeAnnualPlan } from '../../../ngrx/actions/annualPlan.actions';
import { AnnualPlansService } from '../../api/annual-plan/annual-plans.service';
import { AlertifyService } from '../../../shared/util/services/alertify.service';
import { AnnualPlan } from '../../api/annual-plan/annual-plan';

@Component({
  selector: 'app-annual-plans',
  templateUrl: './annual-plans.component.html',
  styleUrls: ['./annual-plans.component.scss']
})
export class AnnualPlansComponent implements OnInit {

  annualPlans$ = this.store.pipe(select(selectAnnualPlans));
  headElements = ['ID', 'Date Of Issue', 'Expiration Date', 'Description', 'Note', 'Worker', 'Action'];

  constructor(private planService: AnnualPlansService, private alertify: AlertifyService, private router: Router,
              private store: Store) {
  }

  ngOnInit() {
  }

  openForAdding() {
    this.router.navigate(['annualPlan/add']);
  }

  deletePlan(annualPlan: AnnualPlan) {
    this.planService.deletePlan(annualPlan.id).subscribe(() => {
      this.alertify.success('Annual Production Plan successfully deleted');
      this.store.dispatch(removeAnnualPlan({annualPlan}));
    }, error => {
      this.alertify.error(error);
    });
  }

}
