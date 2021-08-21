import { createReducer, on } from '@ngrx/store';
import { UnitOfMeasure } from '../../core/api/units-of-measure/unit-of-measure';
import { retrievedUnitsOfMeasure } from '../actions/unitOfMeasure.actions';

export const initialState: UnitOfMeasure[] = [];

export const unitOfMeasureReducer = createReducer(
  initialState,
  on(retrievedUnitsOfMeasure, (state, {unitOnMeasureList}) => [...unitOnMeasureList])
);
