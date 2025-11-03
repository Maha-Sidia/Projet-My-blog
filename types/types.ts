// app/search/components/types.ts
import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string(),
    slug: z.string(),
  }),
});

export const TagSchema = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string(),
    slug: z.string(),
  }),
});

export const PostSchema = z.object({
  id: z.number(),
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string().optional(),
    category: z.object({ data: CategorySchema }).optional(),
    tags: z.object({ data: z.array(TagSchema) }).optional(),
  }),
});

export const PostsResponseSchema = z.object({
  data: z.array(PostSchema),
});
