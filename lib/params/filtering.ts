import type { PaginationParams } from './common';

type GetMutesParams = Exclude<PaginationParams, 'min_id'>;
type GetBlocksParams = PaginationParams;
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
  GetMutesParams,
  GetBlocksParams,
  GetDomainBlocksParams,
  CreateFilterParams,
  UpdateFilterParams,
};
