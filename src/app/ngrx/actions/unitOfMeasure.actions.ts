import { createAction, props } from '@ngrx/store';

export const retrievedUnitsOfMeasure = createAction(
  '[UnitOfMeasure List/API] Retrieved UnitsOfMeasure Success',
  props<{ unitOnMeasureList }>()
);
