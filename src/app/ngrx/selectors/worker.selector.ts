import { AppState } from '../state/app.state';

export const selectWorkers = (state: AppState) => state.workers;
