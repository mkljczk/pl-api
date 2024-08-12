import { z } from 'zod';

/** @see {@link https://docs.pleroma.social/backend/development/API/pleroma_api/#get-apioauth_tokens} */
const oauthTokenSchema = z.object({
  app_name: z.string(),
  id: z.number(),
  valid_until: z.string().datetime({ offset: true }),
});

type OauthToken = z.infer<typeof oauthTokenSchema>;

export { oauthTokenSchema, type OauthToken };
