import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).optional(),
});

const workSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  url: z.string().optional(),
  linkLabel: z.string().optional(),
});

// Entry IDs are locale-prefixed: e.g. "en/building-in-public"
const blog = defineCollection({
  loader: glob({ base: './src/data', pattern: '*/blog/**/*.{md,mdx}' }),
  schema: blogSchema,
});

const work = defineCollection({
  loader: glob({ base: './src/data', pattern: '*/work/**/*.{md,mdx}' }),
  schema: workSchema,
});

export const collections = { blog, work };
