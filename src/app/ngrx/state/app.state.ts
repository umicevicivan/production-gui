import { Product } from '../../core/api/products/product';
import { UnitOfMeasure } from '../../core/api/units-of-measure/unit-of-measure';
import { Worker } from '../../core/api/workers/worker';
import { AnnualPlan } from '../../core/api/annual-plan/annual-plan';

export interface AppState {
  products: Product[];
  unitsOfMeasure: UnitOfMeasure[];
  loggedIn: boolean;
  workers: Worker[];
  annualPlans: AnnualPlan[];
}
