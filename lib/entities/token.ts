import { z } from 'zod';

/** @see {@link https://docs.joinmastodon.org/entities/Token/} */
const tokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
  created_at: z.number(),
});

type Token = z.infer<typeof tokenSchema>;

export { tokenSchema, type Token };
