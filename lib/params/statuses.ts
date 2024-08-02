import { PaginationParams } from './common';

interface CreateStatusWithContent {
  /** The text content of the status. If media_ids is provided, this becomes optional. Attaching a poll is optional while status is provided. */
  status: string;
}

interface CreateStatusWithMedia {
  /** The text content of the status. If media_ids is provided, this becomes optional. Attaching a poll is optional while status is provided. */
  status?: string;
  media_ids: string[];
}

interface CreateStatusWithPoll {
  /** The text content of the status. If media_ids is provided, this becomes optional. Attaching a poll is optional while status is provided. */
  status?: string;
  poll: {
    /** Array of String. Possible answers to the poll. If provided, media_ids cannot be used, and poll[expires_in] must be provided. */
    options: string[];
    /** Integer. Duration that the poll should be open, in seconds. If provided, media_ids cannot be used, and poll[options] must be provided. */
    expires_in: number;
    multiple?:  boolean;
    hide_totals?: boolean;
  };
}

interface CreateStatusOptionalParams {
  in_reply_to_id?: string;
  sensitive?: boolean;
  spoiler_text?: string;
  visibility?: 'public' | 'unlisted' | 'private' | 'direct';
  language?: string;
  scheduled_at?: string;
}

type CreateStatusParams = (CreateStatusWithContent | CreateStatusWithMedia | CreateStatusWithPoll) & CreateStatusOptionalParams;

interface LanguageParam {
  /** Attach translated version of a post. Requires `features.autoTranslate`. */
  language?: string;
}

type GetStatusParams = LanguageParam;

type GetStatusesParams = LanguageParam;

type GetStatusContextParams = LanguageParam;

type GetRebloggedByParams = Exclude<PaginationParams, 'min_id'>

type GetFavouritedByParams = Exclude<PaginationParams, 'min_id'>

interface EditStatusOptionalParams {
  sensitive?: boolean;
  spoiler_text?: string;
  language?: string;
}

type EditStatusParams = (CreateStatusWithContent | CreateStatusWithMedia | CreateStatusWithPoll) & EditStatusOptionalParams;

export type {
  CreateStatusParams,
  GetStatusParams,
  GetStatusesParams,
  GetStatusContextParams,
  GetRebloggedByParams,
  GetFavouritedByParams,
  EditStatusParams,
};

