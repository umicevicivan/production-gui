import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitOfMeasure } from 'src/app/core/api/units-of-measure/unit-of-measure';
import { ProductsService } from '../../../api/products/products.service';
import { AlertifyService } from '../../../../shared/util/services/alertify.service';
import { UnitsOfMeasureService } from '../../../api/units-of-measure/units-of-measure.service';
import { select, Store } from '@ngrx/store';
import { addProduct } from '../../../../ngrx/actions/product.actions';
import { selectUnitsOfMeasure } from '../../../../ngrx/selectors/unitOfMeasure.selector';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {

  addForm: FormGroup;
  unitsOfMeasure$ = this.store.pipe(select(selectUnitsOfMeasure));

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private alertify: AlertifyService, private productService: ProductsService,
              private router: Router, private unitService: UnitsOfMeasureService, private fb: FormBuilder,
              private store: Store) {
  }

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      professionalName: ['', Validators.required],
      shape: ['', Validators.required],
      description: ['', Validators.required],
      instruction: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('([1-9][0-9]*)')]],
      unitOfMeasure: ['', Validators.required]
    });
  }

  addProduct() {
    if (this.addForm.valid) {

      const productToAdd = Object.assign({}, this.addForm.value);

      this.productService.addProduct(productToAdd).subscribe((product) => {
        this.alertify.success('Product Added Successfully');
        this.store.dispatch(addProduct({product}));
        this.router.navigate(['/products']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.alertify.message('Canceled');
    this.router.navigate(['/products']);
  }

}
