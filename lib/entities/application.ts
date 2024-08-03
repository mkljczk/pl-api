import { z } from 'zod';

import type { Resolve } from '../utils/types';

/** @see {@link https://docs.joinmastodon.org/entities/Application/} */
const applicationSchema = z.object({
  name: z.string().catch(''),
  website: z.string().optional().catch(undefined),
  client_id: z.string().optional().catch(undefined),
  client_secret: z.string().optional().catch(undefined),
});

type ApplicationReaction = Resolve<z.infer<typeof applicationSchema>>;

export { applicationSchema, type ApplicationReaction };