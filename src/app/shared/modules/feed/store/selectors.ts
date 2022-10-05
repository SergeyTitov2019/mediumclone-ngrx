import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../../../../auth/types/authState.interface';
import { authFeatureSelector } from '../../../../auth/store/selector';
import { AppStateInterface } from '../../../types/appState.interface';
import { FeedStateInterface } from '../types/feedState.interface';

export const feedFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FeedStateInterface
>('feed');

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
);
export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
);
export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
);
