import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Product } from '../../../api/products/product';
import { AnnualPlan } from '../../../api/annual-plan/annual-plan';
import { PlanItem } from '../../../api/plan-item/plan-item';
import { AlertifyService } from '../../../../shared/util/services/alertify.service';
import { AnnualPlansService } from '../../../api/annual-plan/annual-plans.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../api/products/products.service';
import { WorkersService } from '../../../api/workers/workers.service';
import { select, Store } from '@ngrx/store';
import { selectWorkers } from '../../../../ngrx/selectors/worker.selector';
import { selectProducts } from '../../../../ngrx/selectors/product.selector';
import { addAnnualPlan } from '../../../../ngrx/actions/annualPlan.actions';

@Component({
  selector: 'app-annual-plans-add',
  templateUrl: './annual-plans-add.component.html',
  styleUrls: ['./annual-plans-add.component.scss'],
})
export class AnnualPlansAddComponent implements OnInit {

  addForm: FormGroup;
  addItemForm: FormGroup;

  products$ = this.store.pipe(select(selectProducts));
  workers$ = this.store.pipe(select(selectWorkers));

  annualPlan: AnnualPlan;
  planItems: Array<PlanItem> = [];
  planItem: any;
  bsConfig: Partial<BsDatepickerConfig>;
  today: any;
  minDate: Date;
  headElements = ['Quantity', 'Description', 'Product', 'Action'];

  constructor(
    private alertify: AlertifyService, private planService: AnnualPlansService, private router: Router,
    private productService: ProductsService, private fb: FormBuilder, private workerService: WorkersService,
    private annualPlanService: AnnualPlansService, private store: Store) {
    this.createAddForm();
    this.createAddItemForm();
  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-green',
    };
    this.createCurrentDate();
    this.minDate = new Date();

  }

  createCurrentDate() {
    this.today = new Date();
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0');
    const yyyy = this.today.getFullYear();

    this.today = mm + '/' + dd + '/' + yyyy;
  }

  createAddForm() {
    this.addForm = this.fb.group({
      dateOfIssue: [null],
      expirationDate: [null, Validators.required],
      description: ['', Validators.required],
      note: ['', Validators.required],
      worker: ['', Validators.required],
    });
  }

  createAddItemForm() {
    this.addItemForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.pattern('([1-9][0-9]*)')]],
      description: ['', Validators.required],
      product: ['', Validators.required],
    });
  }


  addPlan() {
    if (this.addForm.valid) {
      this.annualPlan = Object.assign({}, this.addForm.value);
      this.annualPlan.dateOfIssue = new Date();
      this.annualPlan.planItems = this.planItems;
      this.annualPlanService.addPlan(this.annualPlan).subscribe(
        (annualPlan) => {
          this.alertify.success('Annual Plann is Added Successfully');
          this.store.dispatch(addAnnualPlan({annualPlan}));
          this.router.navigate(['/annualPlan']);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }

  addItem() {
    if (this.addItemForm.valid) {
      this.planItem = Object.assign({}, this.addItemForm.value);
      this.planItem.productId = this.planItem.product.id;
      this.planItems.push(this.planItem);
      this.createAddItemForm();
    }
  }

  deleteItem(planItem: PlanItem) {
    this.planItems = this.planItems.filter((obj) => obj !== planItem);
  }

  cancel() {
    this.alertify.message('Canceled');
    this.router.navigate(['/annualPlan']);
  }
}
