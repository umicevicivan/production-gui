import { Component, HostListener, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-annual-plans-edit',
  templateUrl: './annual-plans-edit.component.html',
  styleUrls: ['./annual-plans-edit.component.scss']
})
export class AnnualPlansEditComponent implements OnInit {

  addForm: FormGroup;
  addItemForm: FormGroup;
  products: Product[];
  workers: Worker[];
  annualPlan: AnnualPlan;
  planItems: Array<PlanItem> = [];
  planItem: PlanItem;
  bsConfig: Partial<BsDatepickerConfig>;
  today: any;
  minDate: Date;
  editedItem: PlanItem;
  idToSend: number;
  editedAnnualPlan = new AnnualPlan();
  headElements = ['Id', 'Annual Production Plan Id', 'Quantity', 'Description', 'Product', 'Action'];


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private alertify: AlertifyService,
    private planService: AnnualPlansService,
    private router: Router,
    private productService: ProductsService,
    private fb: FormBuilder,
    private workerService: WorkersService,
    private annualPlanService: AnnualPlansService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.annualPlan = data.annualPlan;
    });
    this.createAddForm();
    this.createAddItemForm();
    this.loadWorkers();
    this.loadProducts();
    this.createCurrentDate();
    this.planItems = this.annualPlan.planItems;
    this.idToSend = this.annualPlan.id;
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

  loadProducts() {
    this.productService.getProducts().subscribe(
      (aaa: Product[]) => {
        this.products = aaa;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadWorkers() {
    this.workerService.getWorkers().subscribe(
      (aaa: Worker[]) => {
        this.workers = aaa;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
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

  editAnnualPlan() {
    this.editedAnnualPlan = Object.assign({}, this.addForm.value);
    this.editedAnnualPlan.dateOfIssue = this.annualPlan.dateOfIssue;
    this.editedAnnualPlan.id = this.annualPlan.id;

    this.editedAnnualPlan.planItems = this.planItems;
    this.annualPlanService.updatePlan(this.idToSend, this.editedAnnualPlan).subscribe(() => {
      this.alertify.success('Annual Plan Edited Successfully');
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
