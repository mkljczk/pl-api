import type { PaginationParams, WithRelationshipsParam } from './common';

interface MuteAccountParams {
  /** Boolean. Mute notifications in addition to statuses? Defaults to true. */
  notifications?: boolean;
  /** Number. How long the mute should last, in seconds. Defaults to 0 (indefinite). */
  duration?: number;
}

type GetMutesParams = Exclude<PaginationParams, 'min_id'> & WithRelationshipsParam;
type GetBlocksParams = PaginationParams & WithRelationshipsParam;
type GetDomainBlocksParams = PaginationParams;

interface CreateFilterParams {
  title: string;
  context: Array<'notifications' | 'public' | 'thread' | 'account'>;
  filter_action?: 'warn' | 'hide';
  expires_in?: number;
  keywords_attributes: Array<{
    keyword: string;
    whole_word?: boolean;
  }>;
}

interface UpdateFilterParams {
  title?: string;
  context?: Array<'notifications' | 'public' | 'thread' | 'account'>;
  filter_action?: 'warn' | 'hide';
  expires_in?: number;
  keywords_attributes?: Array<{
    keyword: string;
    whole_word?: boolean;
    id?: string;
    _destroy?: boolean;
  }>;
}

export type {
  MuteAccountParams,
  GetMutesParams,
  GetBlocksParams,
  GetDomainBlocksParams,
  CreateFilterParams,
  UpdateFilterParams,
};
