import { createAction, props } from '@ngrx/store';

export const retrievedWorkers = createAction(
  '[Workers List/API] Retrieved Workers Success',
  props<{ workersList }>()
);
