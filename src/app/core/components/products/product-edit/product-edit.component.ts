import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/api/products/product';
import { AlertifyService } from '../../../../shared/util/services/alertify.service';
import { UnitsOfMeasureService } from '../../../api/units-of-measure/units-of-measure.service';
import { ProductsService } from '../../../api/products/products.service';
import { select, Store } from '@ngrx/store';
import { selectUnitsOfMeasure } from '../../../../ngrx/selectors/unitOfMeasure.selector';
import { addProduct, editProduct } from '../../../../ngrx/actions/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  addForm: FormGroup;
  unitsOfMeasure$ = this.store.pipe(select(selectUnitsOfMeasure));
  idToSend: number;


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private productService: ProductsService,
              private router: Router, private fb: FormBuilder, private unitService: UnitsOfMeasureService,
              private store: Store) {
  }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data.product;
    });
    this.createAddForm();
    this.idToSend = this.product.id;
  }

  createAddForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      professionalName: [''],
      shape: [''],
      description: [''],
      instruction: [''],
      price: ['', [Validators.required, Validators.pattern('([1-9][0-9]*)')]],
      unitOfMeasure: ['', Validators.required]
    });
  }

  editProduct() {
    this.product = Object.assign({}, this.addForm.value);
    this.productService.updateProduct(this.idToSend, this.product).subscribe(product => {
      this.alertify.success('Product Edited Successfully');
      this.store.dispatch(editProduct({product}));
      this.router.navigate(['/products']);
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.router.navigate(['/products']);
    this.alertify.message('Canceled');
  }


}
