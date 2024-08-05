import { z } from 'zod';

import { emojiSchema, filteredArray } from './utils';
import { accountSchema } from './account';

const baseEmojiReactionSchema = z.object({
  count: z.number().nullable().catch(null),
  me: z.boolean().catch(false),
  name: emojiSchema,
  url: z.literal(undefined).catch(undefined),
  accounts: filteredArray(accountSchema),
});

const customEmojiReactionSchema = baseEmojiReactionSchema.extend({
  name: z.string(),
  url: z.string().url(),
});

/**
 * Pleroma emoji reaction.
 * @see {@link https://docs.pleroma.social/backend/development/API/differences_in_mastoapi_responses/#statuses}
*/
const emojiReactionSchema = baseEmojiReactionSchema.or(customEmojiReactionSchema);

type EmojiReaction = z.infer<typeof emojiReactionSchema>;

export { emojiReactionSchema, type EmojiReaction };
