import { Product } from '../products/product';
import { AnnualPlan } from '../annual-plan/annual-plan';

export class PlanItem {
  id: number;
  annualPlan: AnnualPlan;
  quantity: number;
  description: string;
  productId: number;
  product: Product;
}
