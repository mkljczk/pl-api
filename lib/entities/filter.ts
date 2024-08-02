import { z } from 'zod';

import { Resolve } from '../utils/types';

/** @see {@link https://docs.joinmastodon.org/entities/FilterKeyword/} */
const filterKeywordSchema = z.object({
  id: z.string(),
  keyword: z.string(),
  whole_word: z.boolean(),
});

/** @see {@link https://docs.joinmastodon.org/entities/FilterStatus/} */
const filterStatusSchema = z.object({
  id: z.string(),
  status_id: z.string(),
});

/** @see {@link https://docs.joinmastodon.org/entities/FilterResult/} */
const filterSchema = z.preprocess((filter: any) => {
  if (filter.phrase) {
    return {
      ...filter,
      title: filter.phrase,
      keywords: [{
        keyword: filter.phrase,
        whole_word: filter.whole_word,
      }],
      filter_action: filter.irreversible ? 'hide' : 'warn',
    };
  }
  return filter;
}, z.object({
  id: z.string(),
  title: z.string(),
  context: z.array(z.enum(['home', 'notifications', 'public', 'thread', 'account'])),
  expires_at: z.string().datetime({ offset: true }).nullable().catch(null),
  filter_action: z.enum(['warn', 'hide']).catch('warn'),
  keywords: z.array(filterKeywordSchema).nullable().catch(null),
  statuses: z.array(filterStatusSchema).nullable().catch(null),
}));

type Filter = Resolve<z.infer<typeof filterSchema>>;

export { filterKeywordSchema, filterStatusSchema, filterSchema, type Filter };
