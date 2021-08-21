import { createReducer, on } from '@ngrx/store';
import { AnnualPlan } from '../../core/api/annual-plan/annual-plan';
import { addAnnualPlan, editAnnualPlan, removeAnnualPlan, retrievedAnnualPlanList } from '../actions/annualPlan.actions';


export const initialState: AnnualPlan[] = [];

export const annualPlanReducer = createReducer(
  initialState,
  on(retrievedAnnualPlanList, (state, {annualPlanList}) => [...annualPlanList]),
  on(removeAnnualPlan, (state, {annualPlan}) => state.filter((value) => value !== annualPlan)),
  on(addAnnualPlan, (state, {annualPlan}) => [...state, annualPlan]),
  on(editAnnualPlan, (state, {annualPlan}) => {
    const clone = [...state];
    clone[state.findIndex((value: AnnualPlan) => value.id === annualPlan.id)] = annualPlan;
    return clone;
  })
);
