import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { CurrentUserInterface } from '../../../shared/currentUser.interface';

export const currentUserAction = createAction(ActionTypes.GET_CURRENT_USER);

export const currentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const currentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
);
