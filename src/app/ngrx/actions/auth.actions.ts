import { createAction, props } from '@ngrx/store';

export const toggleLogIn = createAction(
  '[Toggle Log In] Toggle Log In',
  props<{ logIn: boolean }>()
);
