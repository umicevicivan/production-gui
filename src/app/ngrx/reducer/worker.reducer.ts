import { createReducer, on } from '@ngrx/store';
import { Worker } from '../../core/api/workers/worker';
import { retrievedWorkers } from '../actions/worker.actions';

export const initialState: Worker[] = [];

export const workerReducer = createReducer(
  initialState,
  on(retrievedWorkers, (state, {workersList}) => [...workersList])
);
