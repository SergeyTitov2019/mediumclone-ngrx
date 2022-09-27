import { GetFeedResponseInterface } from './getFeedResponseInterface';

export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponseInterface | null;
}
