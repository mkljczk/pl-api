import pick from 'lodash.pick';
import { z } from 'zod';

import { accountSchema } from './account';
import { customEmojiSchema } from './custom-emoji';
import { emojiReactionSchema } from './emoji-reaction';
import { filterResultSchema } from './filter-result';
import { groupSchema } from './group';
import { interactionPolicySchema } from './interaction-policy';
import { mediaAttachmentSchema } from './media-attachment';
import { mentionSchema } from './mention';
import { pollSchema } from './poll';
import { previewCardSchema } from './preview-card';
import { tagSchema } from './tag';
import { translationSchema } from './translation';
import { dateSchema, filteredArray } from './utils';

import type { Resolve } from '../utils/types';

const statusEventSchema = z.object({
  name: z.string().catch(''),
  start_time: z.string().datetime().nullable().catch(null),
  end_time: z.string().datetime().nullable().catch(null),
  join_mode: z.enum(['free', 'restricted', 'invite']).nullable().catch(null),
  participants_count: z.number().catch(0),
  location: z.object({
    name: z.string().catch(''),
    url: z.string().url().catch(''),
    latitude: z.number().catch(0),
    longitude: z.number().catch(0),
    street: z.string().catch(''),
    postal_code: z.string().catch(''),
    locality: z.string().catch(''),
    region: z.string().catch(''),
    country: z.string().catch(''),
  }).nullable().catch(null),
  join_state: z.enum(['pending', 'reject', 'accept']).nullable().catch(null),
});

/** @see {@link https://docs.joinmastodon.org/entities/Status/} */
const baseStatusSchema = z.object({
  id: z.string(),
  uri: z.string().url().catch(''),
  created_at: dateSchema,
  account: accountSchema,
  content: z.string().catch(''),
  visibility: z.string().catch('public'),
  sensitive: z.coerce.boolean(),
  spoiler_text: z.string().catch(''),
  media_attachments: filteredArray(mediaAttachmentSchema),
  application: z.object({
    name: z.string(),
    website: z.string().url().nullable().catch(null),
  }).nullable().catch(null),
  mentions: filteredArray(mentionSchema),
  tags: filteredArray(tagSchema),
  emojis: filteredArray(customEmojiSchema),
  reblogs_count: z.number().catch(0),
  favourites_count: z.number().catch(0),
  replies_count: z.number().catch(0),
  url: z.string().url().catch(''),
  in_reply_to_id: z.string().nullable().catch(null),
  in_reply_to_account_id: z.string().nullable().catch(null),
  poll: pollSchema.nullable().catch(null),
  card: previewCardSchema.nullable().catch(null),
  language: z.string().nullable().catch(null),
  text: z.string().nullable().catch(null),
  edited_at: z.string().datetime().nullable().catch(null),
  favourited: z.coerce.boolean(),
  reblogged: z.coerce.boolean(),
  muted: z.coerce.boolean(),
  bookmarked: z.coerce.boolean(),
  pinned: z.coerce.boolean(),
  filtered: filteredArray(filterResultSchema),
  approval_status: z.enum(['pending', 'approval', 'rejected']).nullable().catch(null),
  group: groupSchema.nullable().catch(null),
  scheduled_at: z.null().catch(null),

  local: z.boolean().optional().catch(undefined),
  conversation_id: z.string().optional().catch(undefined),
  direct_conversation_id: z.string().optional().catch(undefined),
  in_reply_to_account_acct: z.string().optional().catch(undefined),
  expires_at: z.string().datetime({ offset: true }).optional().catch(undefined),
  thread_muted: z.boolean().optional().catch(undefined),
  emoji_reactions: filteredArray(emojiReactionSchema),
  parent_visible: z.boolean().optional().catch(undefined),
  pinned_at: z.string().datetime({ offset: true }).nullable().catch(null),
  quote_visible: z.boolean().optional().catch(undefined),
  quote_url: z.string().optional().catch(undefined),
  quotes_count: z.number().catch(0),
  bookmark_folder: z.string().nullable().catch(null),

  event: statusEventSchema.nullable().catch(null),
  translation: translationSchema.nullable().or(z.literal(false)).catch(null),

  content_map: z.record(z.string()).nullable().catch(null),
  text_map: z.record(z.string()).nullable().catch(null),
  spoiler_text_map: z.record(z.string()).nullable().catch(null),

  dislikes_count: z.number().catch(0),
  disliked: z.coerce.boolean().catch(false),

  interaction_policy: interactionPolicySchema,
});

const preprocess = (status: any) => {
  if (!status) return null;
  status = {
    ...(pick(status.pleroma || {}, [
      'quote',
      'local',
      'conversation_id',
      'direct_conversation_id',
      'in_reply_to_account_acct',
      'expires_at',
      'thread_muted',
      'emoji_reactions',
      'parent_visible',
      'pinned_at',
      'quotes_count',
      'bookmark_folder',

      'event',
      'translation',
    ])),
    ...(pick(status.friendica || {}, [
      'dislikes_count',
      'disliked',
    ])),
    ...status,
  };

  return status;
};

const statusSchema = z.preprocess(preprocess, baseStatusSchema.extend({
  reblog: z.lazy(() => baseStatusSchema).nullable().catch(null),

  quote: z.lazy(() => baseStatusSchema).nullable().catch(null),
}));

const statusWithoutAccountSchema = z.preprocess(preprocess, baseStatusSchema.omit({ account: true }).extend({
  account: accountSchema.nullable().catch(null),
  reblog: z.lazy(() => baseStatusSchema).nullable().catch(null),

  quote: z.lazy(() => baseStatusSchema).nullable().catch(null),
}));

type Status = Resolve<z.infer<typeof statusSchema>>;

export { statusSchema, statusWithoutAccountSchema, type Status };
