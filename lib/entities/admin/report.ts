import { z } from 'zod';

import { ruleSchema } from '../rule';
import { statusSchema } from '../status';
import { dateSchema, filteredArray } from '../utils';

import { adminAccountSchema } from './account';

/** @see {@link https://docs.joinmastodon.org/entities/Admin_Report/} */
const adminReportSchema = z.object({
  id: z.string(),
  action_taken: z.boolean().optional().catch(undefined),
  action_taken_at: dateSchema.nullable().catch(null),
  category: z.string().optional().catch(undefined),
  comment: z.string().optional().catch(undefined),
  forwarded: z.boolean().optional().catch(undefined),
  created_at: dateSchema.optional().catch(undefined),
  updated_at: dateSchema.optional().catch(undefined),
  account: adminAccountSchema,
  target_account: adminAccountSchema,
  assigned_account: adminAccountSchema.nullable().catch(null),
  action_taken_by_account: adminAccountSchema.nullable().catch(null),
  statuses: filteredArray(statusSchema),
  rules: filteredArray(ruleSchema),
});

type AdminReport = z.infer<typeof adminReportSchema>;

export { adminReportSchema, type AdminReport };
