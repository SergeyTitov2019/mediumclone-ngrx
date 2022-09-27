import { FeedStateInterface } from '../types/feedState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getFeedAction,
  getFeedSuccess,
  getFeedFailure,
} from './actions/getfeed.action';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFeedSuccess,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })
  ),
  on(
    getFeedFailure,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
