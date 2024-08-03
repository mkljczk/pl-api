import { z } from 'zod';

import { Resolve } from '../utils/types';

import { filteredArray } from './utils';

const translationPollSchema = z.object({
  id: z.string(),
  options: z.array(z.object({
    title: z.string(),
  })),
});

const translationMediaAttachment = z.object({
  id: z.string(),
  description: z.string().catch(''),
});

/** @see {@link https://docs.joinmastodon.org/entities/Translation/} */
const translationSchema = z.object({
  content: z.string().catch(''),
  spoiler_text: z.string().catch(''),
  poll: translationPollSchema.optional().catch(undefined),
  media_attachments: filteredArray(translationMediaAttachment).catch([]),
  detected_source_language: z.string(),
  provider: z.string(),
});

type Translation = Resolve<z.infer<typeof translationSchema>>;

export { translationSchema, type Translation };