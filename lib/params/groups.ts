import { PaginationParams } from './common';

interface CreateGroupParams {
  display_name: string;
  note?: string;
  avatar?: File;
  header?: File;
}

interface UpdateGroupParams {
  display_name?: string;
  note?: string;
  avatar?: File;
  header?: File;
}

type GetGroupMembershipsParams = Exclude<PaginationParams, 'min_id'>;
type GetGroupMembershipRequestsParams = Exclude<PaginationParams, 'min_id'>;
type GetGroupBlocksParams = Exclude<PaginationParams, 'min_id'>;

type GroupMemberRole = 'admin' | 'moderator' | 'user';

export type {
  CreateGroupParams,
  UpdateGroupParams,
  GetGroupMembershipsParams,
  GetGroupMembershipRequestsParams,
  GetGroupBlocksParams,
  GroupMemberRole,
};
