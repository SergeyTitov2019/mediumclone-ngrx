import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from './store/actions/getfeed.action';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from './types/getFeedResponseInterface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from './store/selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  // error$: Observable<string | null>;
  error$: Observable<any>;
  // feed$: Observable<GetFeedResponseInterface | null>;
  feed$: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }
}
