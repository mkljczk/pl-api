import type { OnlyEventsParam, OnlyMediaParam, PaginationParams, WithMutedParam } from './common';

interface PublicTimelineParams extends PaginationParams, WithMutedParam, OnlyEventsParam, OnlyMediaParam {
  /** Boolean. Show only local statuses? Defaults to false. */
  local?: boolean;
  /** Boolean. Show only remote statuses? Defaults to false. */
  remote?: boolean;
}

interface HashtagTimelineParams extends PaginationParams, WithMutedParam, OnlyEventsParam, OnlyMediaParam {
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

type GroupTimelineParams = PaginationParams & WithMutedParam & OnlyMediaParam;

export type {
  PublicTimelineParams,
  HashtagTimelineParams,
  HomeTimelineParams,
  LinkTimelineParams,
  ListTimelineParams,
  GetConversationsParams,
  SaveMarkersParams,
  GroupTimelineParams,
};
