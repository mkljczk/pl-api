import { z } from 'zod';

import { Resolve } from '../utils/types';

/** @see {@link https://docs.joinmastodon.org/entities/StatusSource/} */
const statusSourceSchema = z.object({
  id: z.string(),
  text: z.string().catch(''),
  spoiler_text: z.string().catch(''),
});

type StatusSource = Resolve<z.infer<typeof statusSourceSchema>>;

export { statusSourceSchema, type StatusSource };
