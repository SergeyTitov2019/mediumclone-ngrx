import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { GetFeedResponseInterface } from '../../types/getFeedResponseInterface';

export const getFeedAction = createAction(
  ActionTypes.GET_FEED,
  props<{ url: string }>()
);

export const getFeedSuccess = createAction(
  ActionTypes.GET_FEED_SUCCESS,
  props<{ feed: GetFeedResponseInterface }>()
);

export const getFeedFailure = createAction(ActionTypes.GET_FEED_FAILURE);
