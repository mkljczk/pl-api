import z from 'zod';

import { customEmojiSchema } from './custom-emoji';
import { roleSchema } from './role';
import { dateSchema, filteredArray } from './utils';

const fieldSchema = z.object({
  name: z.string(),
  value: z.string(),
  verified_at: z.string().datetime({ offset: true }).nullable().catch(null),
});

const baseAccountSchema = z.object({
  id: z.string(),
  username: z.string().catch(''),
  acct: z.string().catch(''),
  url: z.string().url(),
  display_name: z.string().catch(''),
  note: z.string().catch(''),
  avatar: z.string().catch(''),
  avatar_static: z.string().url().optional().catch(undefined),
  header: z.string().url().catch(''),
  header_static: z.string().url().optional().catch(undefined),
  locked: z.boolean().catch(false),
  fields: filteredArray(fieldSchema),
  emojis: filteredArray(customEmojiSchema),
  bot: z.boolean().catch(false),
  group: z.boolean().catch(false),
  discoverable: z.boolean().catch(false),
  noindex: z.boolean().nullable().catch(null),
  suspended: z.boolean().optional().catch(undefined),
  limited: z.boolean().optional().catch(undefined),
  created_at: z.string().datetime().catch(new Date().toUTCString()),
  last_status_at: z.string().datetime().nullable().catch(null),
  statuses_count: z.number().catch(0),
  followers_count: z.number().catch(0),
  following_count: z.number().catch(0),
});

/** @see {@link https://docs.joinmastodon.org/entities/Account/} */
const accountSchema = baseAccountSchema.extend({
  moved: baseAccountSchema.optional().catch(undefined),
});

type Account = z.infer<typeof accountSchema>;

const credentialAccountSchema = accountSchema.extend({
  source: z.object({
    note: z.string().catch(''),
    fields: filteredArray(fieldSchema),
    privacy: z.enum(['public', 'unlisted', 'private', 'direct']),
    sensitive: z.boolean().catch(false),
    language: z.string().nullable().catch(null),
    follow_requests_count: z.number().int().nonnegative().catch(0),
  }).nullable().catch(null),
  role: roleSchema.nullable().catch(null),
});

type CredentialAccount = z.infer<typeof credentialAccountSchema>;

const mutedAccountSchema = accountSchema.extend({
  mute_expires_at: dateSchema.nullable().catch(null),
});

type MutedAccount = z.infer<typeof mutedAccountSchema>;

export {
  accountSchema,
  credentialAccountSchema,
  mutedAccountSchema,
  type Account,
  type CredentialAccount,
  type MutedAccount,
};
