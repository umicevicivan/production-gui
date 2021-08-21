import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../api/products/product';
import { AnnualPlan } from '../../../api/annual-plan/annual-plan';
import { PlanItem } from '../../../api/plan-item/plan-item';
import { AlertifyService } from '../../../../shared/util/services/alertify.service';
import { AnnualPlansService } from '../../../api/annual-plan/annual-plans.service';
import { ProductsService } from '../../../api/products/products.service';
import { WorkersService } from '../../../api/workers/workers.service';
import { select, Store } from '@ngrx/store';
import { selectProducts } from '../../../../ngrx/selectors/product.selector';
import { selectWorkers } from '../../../../ngrx/selectors/worker.selector';
import { PlanItemService } from '../../../api/plan-item/plan-item.service';
import { editAnnualPlan } from '../../../../ngrx/actions/annualPlan.actions';

@Component({
  selector: 'app-annual-plans-edit',
  templateUrl: './annual-plans-edit.component.html',
  styleUrls: ['./annual-plans-edit.component.scss']
})
export class AnnualPlansEditComponent implements OnInit {

  addForm: FormGroup;
  addItemForm: FormGroup;

  products$ = this.store.pipe(select(selectProducts));
  workers$ = this.store.pipe(select(selectWorkers));


  annualPlan: AnnualPlan;

  bsConfig: Partial<BsDatepickerConfig>;
  today: any;
  minDate: Date;

  headElements = ['Id', 'Annual Production Plan Id', 'Quantity', 'Description', 'Product', 'Action'];

  constructor(
    private alertify: AlertifyService, private planService: AnnualPlansService, private router: Router,
    private productService: ProductsService, private fb: FormBuilder, private workerService: WorkersService,
    private annualPlanService: AnnualPlansService, private route: ActivatedRoute, private store: Store,
    private planItemService: PlanItemService) {
    this.createAddForm();
    this.createAddItemForm();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.annualPlan = data.annualPlan;
    });
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

  addItem() {
    if (this.addItemForm.valid) {
      let planItem: PlanItem;
      planItem = Object.assign({}, this.addItemForm.value);
      this.annualPlan.planItems.push(planItem);
      this.createAddItemForm();
    }
  }

  deleteItem(planItem: PlanItem) {
    this.planItemService.deletePlan(planItem.id).subscribe(() => {
      this.annualPlan.planItems = this.annualPlan.planItems.filter((obj) => obj !== planItem);
      this.alertify.success('Plan item deleted successfully');
    });
  }

  editAnnualPlan() {
    let annualPlanForEdit: AnnualPlan;
    annualPlanForEdit = Object.assign({}, this.addForm.value);
    annualPlanForEdit.dateOfIssue = this.annualPlan.dateOfIssue;
    annualPlanForEdit.id = this.annualPlan.id;

    annualPlanForEdit.planItems = this.annualPlan.planItems;

    this.annualPlanService.updatePlan(annualPlanForEdit.id, annualPlanForEdit).subscribe((annualPlan) => {
      this.alertify.success('Annual Plan Edited Successfully');
      this.store.dispatch(editAnnualPlan({annualPlan}));
      this.router.navigate(['/annualPlan']);
    }, error => {
      this.alertify.error(error);
    });
  }


  cancel() {
    this.router.navigate(['/annualPlan']);
    this.alertify.message('Canceled');
  }

}
