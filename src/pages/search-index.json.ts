import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const [posts, works] = await Promise.all([
    getCollection('blog'),
    getCollection('work'),
  ]);

  const index = [
    ...posts.map((p) => ({
      type: 'blog',
      slug: p.id.replace(/\.mdx?$/, ''),
      title: p.data.title,
      description: p.data.description,
      url: `/blog/${p.id.replace(/\.mdx?$/, '')}`,
    })),
    ...works.map((w) => ({
      type: 'work',
      slug: w.id.replace(/\.mdx?$/, ''),
      title: w.data.title,
      description: w.data.description,
      url: `/work/${w.id.replace(/\.mdx?$/, '')}`,
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
