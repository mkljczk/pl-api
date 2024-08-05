import type { OnlyEventsParam, PaginationParams, WithMutedParam } from './common';

interface PublicTimelineParams extends PaginationParams, WithMutedParam, OnlyEventsParam {
  /** Boolean. Show only local statuses? Defaults to false. */
  local?: boolean;
  /** Boolean. Show only remote statuses? Defaults to false. */
  remote?: boolean;
  /** Boolean. Show only statuses with media attached? Defaults to false. */
  only_media?: boolean;
}

interface HashtagTimelineParams extends PaginationParams, WithMutedParam, OnlyEventsParam {
  /** Array of String. Return statuses that contain any of these additional tags. */
  any?: string[];
  /** Array of String. Return statuses that contain all of these additional tags. */
  all?: string[];
  /** Array of String. Return statuses that contain none of these additional tags. */
  none?: string[];
  /** Boolean. Show only local statuses? Defaults to false. */
  local?: boolean;
  /** Boolean. Show only remote statuses? Defaults to false. */
  remote?: boolean;
  /** Boolean. Show only statuses with media attached? Defaults to false. */
  only_media?: boolean;

  /**
   * Bolean. Filter out statuses without events.
   * Requires `features.events`.
   */
  only_events?: boolean;
}

type HomeTimelineParams = PaginationParams & WithMutedParam & OnlyEventsParam;
type LinkTimelineParams = PaginationParams & WithMutedParam;
type ListTimelineParams = PaginationParams & WithMutedParam & OnlyEventsParam;

interface GetConversationsParams extends PaginationParams {
  /**
   * Only return conversations with the given recipients (a list of user ids).
   * Requires `features.conversationsByRecipients`.
   * */
  recipients?: string[];
}

interface SaveMarkersParams {
  home?: {
    /** String. ID of the last status read in the home timeline. */
    last_read_id?: string;
  };
  notifications?: {
    /** String. ID of the last notification read. */
    last_read_id?: string;
  };
}

export type {
  PublicTimelineParams,
  HashtagTimelineParams,
  HomeTimelineParams,
  LinkTimelineParams,
  ListTimelineParams,
  GetConversationsParams,
  SaveMarkersParams,
};
