import { createAction, props } from '@ngrx/store';

export const addAnnualPlan = createAction(
  '[Annual Plan List] Add Annual Plan',
  props<{ annualPlan }>()
);

export const removeAnnualPlan = createAction(
  '[Annual Plan List] Remove Annual Plan',
  props<{ annualPlan }>()
);

export const editAnnualPlan = createAction(
  '[Annual Plan List] Edit Annual Plan in list',
  props<{ annualPlan }>()
);

export const retrievedAnnualPlanList = createAction(
  '[Annual Plan List/API] Retrieved Annual Plans Success',
  props<{ annualPlanList }>()
);

