import { z } from 'zod';

import { announcementSchema } from './announcement';
import { announcementReactionSchema } from './announcement-reaction';
import { conversationSchema } from './conversation';
import { notificationSchema } from './notification';
import { statusSchema } from './status';

const baseStreamingEventSchema = z.object({
  stream: z.array(z.string()).catch([]),
});

const statusStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.enum(['update', 'status.update']),
  payload: z.preprocess((payload: any) => JSON.parse(payload), statusSchema),
});

const stringStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.enum(['delete', 'announcement.delete']),
  payload: z.string(),
});

const notificationStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.literal('notification'),
  payload: z.preprocess((payload: any) => JSON.parse(payload), notificationSchema),
});

const emptyStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.literal('filters_changed'),
});

const conversationStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.literal('conversation'),
  payload: z.preprocess((payload: any) => JSON.parse(payload), conversationSchema),
});

const announcementStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.literal('announcement'),
  payload: z.preprocess((payload: any) => JSON.parse(payload), announcementSchema),
});

const announcementReactionStreamingEventSchema = baseStreamingEventSchema.extend({
  event: z.literal('announcement.reaction'),
  payload: z.preprocess((payload: any) => JSON.parse(payload), announcementReactionSchema),
});

/** @see {@link https://docs.joinmastodon.org/methods/streaming/#events} */
const streamingEventSchema = z.discriminatedUnion('event', [
  statusStreamingEventSchema,
  stringStreamingEventSchema,
  notificationStreamingEventSchema,
  emptyStreamingEventSchema,
  conversationStreamingEventSchema,
  announcementStreamingEventSchema,
  announcementReactionStreamingEventSchema,
]);

type StreamingEvent = z.infer<typeof streamingEventSchema>;

export { streamingEventSchema, type StreamingEvent };
