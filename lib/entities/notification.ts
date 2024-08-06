import { z } from 'zod';

import { accountSchema } from './account';
import { accountWarningSchema } from './account-warning';
import { chatMessageSchema } from './chat-message';
import { relationshipSeveranceEventSchema } from './relationship-severance-event';
import { reportSchema } from './report';
import { statusSchema } from './status';
import { dateSchema } from './utils';

const baseNotificationSchema = z.object({
  account: accountSchema,
  created_at: dateSchema,
  id: z.string(),
  type: z.string(),
});

const accountNotificationSchema = baseNotificationSchema.extend({
  type: z.enum(['follow', 'follow_request', 'admin.sign_up']),
});

const statusNotificationSchema = baseNotificationSchema.extend({
  type: z.enum(['mention', 'status', 'reblog', 'favourite', 'poll', 'update']),
  status: statusSchema,
});

const reportNotificationSchema = baseNotificationSchema.extend({
  type: z.literal('admin.report'),
  report: reportSchema,
});

const severedRelationshipNotificationSchema = baseNotificationSchema.extend({
  type: z.literal('severed_relationships'),
  relationship_severance_event: relationshipSeveranceEventSchema,
});

const moderationWarningNotificationSchema = baseNotificationSchema.extend({
  type: z.literal('moderation_warning'),
  moderation_warning: accountWarningSchema,
});

const moveNotificationSchema = baseNotificationSchema.extend({
  type: z.literal('move'),
  target: accountSchema,
});

const emojiReactionNotificationSchema = baseNotificationSchema.extend({
  type: z.literal('emoji_reaction'),
  emoji: z.string(),
  status: statusSchema,
});

const chatMentionNotificationSchema = baseNotificationSchema.extend({
  type: z.literal('chat_mention'),
  chat_message: chatMessageSchema,
});

/** @see {@link https://docs.joinmastodon.org/entities/Notification/} */
const notificationSchema = z.preprocess((notification: any) => ({
  ...notification,
  type: notification.type === 'pleroma:report'
    ? 'admin.report'
    : notification.type?.replace(/^pleroma:/, ''),
}), z.discriminatedUnion('type', [
  accountNotificationSchema,
  statusNotificationSchema,
  reportNotificationSchema,
  severedRelationshipNotificationSchema,
  moderationWarningNotificationSchema,
  moveNotificationSchema,
  emojiReactionNotificationSchema,
  chatMentionNotificationSchema,
]));

type Notification = z.infer<typeof notificationSchema>;

export { notificationSchema, type Notification };
