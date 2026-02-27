import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL | undefined }) {
  const posts = (await getCollection('blog', (entry: any) => !entry.data.draft)).sort(
    (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Christian D. Glissov - Blog',
    description: 'AI engineering, evaluation, and scientific computing notes.',
    site: context.site ?? 'https://cdglissov.github.io',
    items: posts.map((post: any) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`
    }))
  });
}
