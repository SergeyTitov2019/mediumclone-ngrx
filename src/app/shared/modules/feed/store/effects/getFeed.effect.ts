import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeedService } from '../../services/feed.service';
import {
  getFeedAction,
  getFeedFailure,
  getFeedSuccess,
} from '../actions/getfeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponseInterface';

@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.action$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccess({ feed });
          }),

          catchError(() => {
            return of(getFeedFailure());
          })
        );
      })
    )
  );

  constructor(private action$: Actions, private feedService: FeedService) {}
}
