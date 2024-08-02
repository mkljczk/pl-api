import { z } from 'zod';

import { accountSchema } from './account';
import { customEmojiSchema } from './custom-emoji';
import { filterResultSchema } from './filter-result';
import { mediaAttachmentSchema } from './media-attachment';
import { mentionSchema } from './mention';
import { pollSchema } from './poll';
import { previewCardSchema } from './preview-card';
import { tagSchema } from './tag';
import { dateSchema, filteredArray } from './utils';

import type { Resolve } from '../utils/types';

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
});

const statusSchema = baseStatusSchema.extend({
  reblog: z.lazy(() => baseStatusSchema).nullable().catch(null),
});

type Status = Resolve<z.infer<typeof statusSchema>>;

export { statusSchema, type Status };
