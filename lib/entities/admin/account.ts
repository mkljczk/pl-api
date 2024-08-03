import { z } from 'zod';

import { accountSchema } from '../account';
import { roleSchema } from '../role';
import { dateSchema, filteredArray } from '../utils';

import { adminIpSchema } from './ip';

/** @see {@link https://docs.joinmastodon.org/entities/Admin_Account/} */
const adminAccountSchema = z.object({
  id: z.string(),
  username: z.string(),
  domain: z.string().nullable().catch(null),
  created_at: dateSchema,
  email: z.string().nullable().catch(null),
  ip: z.string().ip().nullable().catch(null),
  ips: filteredArray(adminIpSchema).catch([]),
  locale: z.string().nullable().catch(null),
  invite_request: z.string().nullable().catch(null),
  role: roleSchema.nullable().catch(null),
  confirmed: z.boolean().catch(false),
  approved: z.boolean().catch(false),
  disabled: z.boolean().catch(false),
  silenced: z.boolean().catch(false),
  suspended: z.boolean().catch(false),
  account: accountSchema,
  created_by_application_id: z.string().optional().catch(undefined),
  invited_by_account_id: z.string().optional().catch(undefined),
});

type AdminAccount = z.infer<typeof adminAccountSchema>;

export {
  adminAccountSchema,
  type AdminAccount,
};
