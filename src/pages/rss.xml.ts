import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { RSSFeedItem } from '@astrojs/rss';

export async function GET(context: { site: URL | undefined }) {
  const posts = (await getCollection('blog', (entry) => !entry.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  interface RSSFeedConfig {
    title: string;
    description: string;
    site: URL | string;
    items: RSSFeedItem[];
  }

    const feedConfig: RSSFeedConfig = {
      title: 'Christian D. Glissov - Blog',
      description: 'AI engineering, evaluation, and scientific computing notes.',
      site: context.site ?? 'https://cdglissov.github.io',
      items: posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`
      }))
    };

    return rss(feedConfig);
}
