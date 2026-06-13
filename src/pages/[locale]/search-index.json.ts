import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { LOCALES } from '../../i18n';

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((locale) => ({ params: { locale } }));
};

const toSlug = (id: string) => id.split('/').slice(2).join('/').replace(/\.mdx?$/, '');

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale ?? 'en';

  const [allPosts, allWorks] = await Promise.all([
    getCollection('blog'),
    getCollection('work'),
  ]);

  const posts = allPosts.filter((p) => p.id.startsWith(locale + '/'));
  const works = allWorks.filter((w) => w.id.startsWith(locale + '/'));

  const index = [
    ...posts.map((p) => {
      const slug = toSlug(p.id);
      return {
        type: 'blog',
        slug,
        title: p.data.title,
        description: p.data.description,
        url: '/' + locale + '/blog/' + slug,
      };
    }),
    ...works.map((w) => {
      const slug = toSlug(w.id);
      return {
        type: 'work',
        slug,
        title: w.data.title,
        description: w.data.description,
        url: '/' + locale + '/work/' + slug,
      };
    }),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
