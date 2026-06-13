import type { APIRoute, GetStaticPaths } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { getCollection } from 'astro:content';
import { LOCALES, t, localeParam, DEFAULT_LOCALE } from '../../i18n';

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((locale) => ({ params: { locale: localeParam(locale) } }));
};

const toSlug = (id: string) => id.split('/').slice(2).join('/').replace(/\.mdx?$/, '');

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale ?? DEFAULT_LOCALE;
  const strings = t(locale);

  const [allPosts, allWorks] = await Promise.all([
    getCollection('blog'),
    getCollection('work'),
  ]);

  const posts = allPosts.filter((p) => p.id.startsWith(locale + '/'));
  const works = allWorks.filter((w) => w.id.startsWith(locale + '/'));

  // Top-level pages - reuse existing translated titles/descriptions, plus
  // keyword aliases so navigational and synonym queries resolve.
  const k = strings.search.keywords;
  const pages = [
    { type: 'page', slug: 'work',    title: strings.work.title,     description: strings.work.description,     url: getRelativeLocaleUrl(locale, 'work'),    keywords: k.work },
    { type: 'page', slug: 'blog',    title: strings.blog.title,     description: strings.blog.description,     url: getRelativeLocaleUrl(locale, 'blog'),    keywords: k.blog },
    { type: 'page', slug: 'about',   title: strings.about.title,    description: strings.about.description,    url: getRelativeLocaleUrl(locale, 'about'),   keywords: k.about },
    { type: 'page', slug: 'contact', title: strings.contact.title,  description: strings.contact.description,  url: getRelativeLocaleUrl(locale, 'contact'), keywords: k.contact },
  ];

  const index = [
    ...pages,
    ...posts.map((p) => {
      const slug = toSlug(p.id);
      return {
        type: 'blog',
        slug,
        title: p.data.title,
        description: p.data.description,
        url: getRelativeLocaleUrl(locale, 'blog/' + slug),
        keywords: (p.data.tags ?? []).join(' '),
      };
    }),
    ...works.map((w) => {
      const slug = toSlug(w.id);
      return {
        type: 'work',
        slug,
        title: w.data.title,
        description: w.data.description,
        url: getRelativeLocaleUrl(locale, 'work/' + slug),
        keywords: (w.data.tags ?? []).join(' '),
      };
    }),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
