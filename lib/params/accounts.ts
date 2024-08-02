import { PaginationParams } from './common';

interface CreateAccountParams {
  username: string;
  email: string;
  password: string;
  aggrement: string;
  locale: string;
  reason?: string;
}

interface UpdateCredentialsParams {
  display_name?: string;
  note?: string;
  avatar?: File;
  header?: File;
  locked?: boolean;
  bot?: boolean;
  discoverable?: boolean;
  hide_collections?: boolean;
  indexable?: boolean;
  fields_attributes?: Array<{
    name: string;
    value: string;
  }>;
  source?: {
    privacy?: string;
    sensitive?: string;
    language?: string;
  };
}

interface GetAccountStatusesParams extends PaginationParams {
  /* Boolean. Filter out statuses without attachments. */
  only_media?: boolean;
  /* Boolean. Filter out statuses in reply to a different account. */
  exclude_replies?: boolean;
  /* Boolean. Filter for pinned statuses only. Defaults to false, which includes all statuses. Pinned statuses do not receive special priority in the order of the returned results. */
  pinned?: boolean;
  /* String. Filter for statuses using a specific hashtag. */
  tagged?: string;
}

type GetAccountFollowersParams = PaginationParams;

type GetAccountFollowingParams = PaginationParams;

interface FollowAccountParams {
  /** Boolean. Receive this account’s reblogs in home timeline? Defaults to true. */
  reblogs?: boolean;
  /** Boolean. Receive notifications when this account posts a status? Defaults to false. */
  notify?: boolean;
  /**
   * Array of String (ISO 639-1 language two-letter code). Filter received statuses for these languages. If not provided, you will receive this account’s posts in all languages.
   * Requires `features.followAccountLangugaes`.
  */
  languages?: string[];
}

interface MuteAccountParams {
  /** Boolean. Mute notifications in addition to statuses? Defaults to true. */
  notifications?: boolean;
  /** Number. How long the mute should last, in seconds. Defaults to 0 (indefinite). */
  duration?: number;
}

interface GetRelationshipsParams {
  /** Boolean. Whether relationships should be returned for suspended users, defaults to false. */
  with_suspended?: boolean;
}

interface SearchAccountParams {
  /**  Integer. Maximum number of results. Defaults to 40 accounts. Max 80 accounts. */
  limit?: number;
  /**  Integer. Skip the first n results. */
  offset?: number;
  /**  Boolean. Attempt WebFinger lookup. Defaults to false. Use this when `q` is an exact address. */
  resolve?: boolean;
  /**  Boolean. Limit the search to users you are following. Defaults to false. */
  following?: boolean;
}

type GetBookmarksParams = PaginationParams;
type GetFavouritesParams = PaginationParams;

interface ReportAccountParams {
  status_ids?: string[];
  comment?: string;
  forward?: boolean;
  category?: 'spam' | 'legal' | 'violation' | 'other';
  rule_ids?: number[];
}

type GetFollowRequestsParams = Exclude<PaginationParams, 'min_id'>;
type GetEndorsementsParams = Exclude<PaginationParams, 'min_id'>;
type GetFollowedTagsParams = PaginationParams;

export type {
  CreateAccountParams,
  UpdateCredentialsParams,
  GetAccountStatusesParams,
  GetAccountFollowersParams,
  GetAccountFollowingParams,
  FollowAccountParams,
  MuteAccountParams,
  GetRelationshipsParams,
  SearchAccountParams,
  GetBookmarksParams,
  GetFavouritesParams,
  ReportAccountParams,
  GetFollowRequestsParams,
  GetEndorsementsParams,
  GetFollowedTagsParams,
};
