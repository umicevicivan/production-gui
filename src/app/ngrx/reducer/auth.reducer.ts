import { createReducer, on } from '@ngrx/store';
import { toggleLogIn } from '../actions/auth.actions';

export const initialState = false;

export const authReducer = createReducer(
  initialState,
  on(toggleLogIn, (state, {logIn}) => logIn)
);
