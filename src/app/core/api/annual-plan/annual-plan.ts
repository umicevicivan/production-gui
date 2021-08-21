import { PlanItem } from '../plan-item/plan-item';
import { Worker } from '../workers/worker';

export class AnnualPlan {
  id: number;
  dateOfIssue: Date;
  expirationDate: Date;
  description: string;
  note: string;
  worker: Worker;
  planItems: PlanItem[];
}
