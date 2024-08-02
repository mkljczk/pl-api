import { z } from 'zod';

import { accountSchema } from './account';
import { accountWarningSchema } from './account-warning';
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

/** @see {@link https://docs.joinmastodon.org/entities/Notification/} */
const notificationSchema = z.discriminatedUnion('type', [
  accountNotificationSchema,
  statusNotificationSchema,
  reportNotificationSchema,
  severedRelationshipNotificationSchema,
  moderationWarningNotificationSchema,
]);

type Notification = z.infer<typeof notificationSchema>;

export { notificationSchema, type Notification };
