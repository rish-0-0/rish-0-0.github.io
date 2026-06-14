/**
 * Site-wide identity & SEO defaults. Externalised here (not hardcoded in the
 * layout) so a customer instance can be rebranded by editing one file.
 */
export const SITE = {
  /** Production origin. Must match `site` in astro.config.mjs. */
  url: 'https://rishabh-anand.com',
  /** Brand / site name used in <title> suffix, og:site_name, JSON-LD. */
  name: 'Rishabh Anand',
  /** Person behind the site (JSON-LD author, twitter:creator fallback). */
  author: 'Rishabh Anand',
  /**
   * Default social-share image, served from /public. Replace with a real
   * 1200×630 PNG/JPG — social platforms (X, Facebook, LinkedIn) do not render
   * SVG OG images. Leave null to omit og:image entirely.
   */
  ogImage: '/life.jpg' as string | null,
  /**
   * Brand logo, served from /public. Emitted as og:logo and JSON-LD logo.
   * Note: og:logo is non-standard OG; og:image is what social platforms use.
   * Leave null to omit. Replace favicon.svg with a real logo when available.
   */
  logo: '/logo.png' as string | null,
  /** Twitter/X handle (without @), or null. Used for twitter:site/creator. */
  twitter: null as string | null,
} as const;
