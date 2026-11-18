import type { MetadataRoute } from 'next';
import { PROFILES } from '@/app/team/[slug]/profiles';
import { getAllPaths } from '@/lib/content';
import { getBlogs, getSuccessStories } from '@/lib/db';

const SITE = 'https://bansalimmigration.com.au';

/** Pages that are not built from content/index.json. */
const STATIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/team',
  '/book-an-appointment',
  '/testimonials',
  '/blogs',
  '/success-stories',
  '/disclaimer',
  '/cookie-policy',
  '/privacy-policy',
  '/terms-conditions',
  '/occupation-finder',
  '/postcode-checker',
  '/afp-national-police-check',
  '/office-visit-form',
  '/office-visit-form/thank-you',
  '/south-australia-state-nomination',
  '/migrate-to-australia/pr-point-calculator',
  '/migrate-to-australia/victorian-points-test',
  '/study-australia/student-visa-financial-calculator',
];

/** Reads the database on each request so new posts and stories are listed. */
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(STATIC_PATHS);

  for (const path of getAllPaths()) {
    if (path.startsWith('/')) paths.add(path);
  }

  for (const slug of Object.keys(PROFILES)) {
    paths.add(`/team/${slug}`);
  }

  try {
    const blogs = await getBlogs();
    for (const blog of blogs) {
      if (blog.slug) paths.add(`/blogs/${blog.slug}`);
    }
  } catch (error) {
    console.warn('Sitemap could not list blog posts:', error);
  }

  try {
    const stories = await getSuccessStories();
    for (const story of stories) {
      if (story.slug) paths.add(`/success-stories/${story.slug}`);
    }
  } catch (error) {
    console.warn('Sitemap could not list success stories:', error);
  }

  return [...paths]
    .sort((a, b) => a.localeCompare(b))
    .map((path) => ({
      url: path === '/' ? SITE : `${SITE}${path}`,
    }));
}
