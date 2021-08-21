import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from '../../../core/components/products/product-edit/product-edit.component';


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent) {
    if (component.addForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }
    return true;
  }
}
