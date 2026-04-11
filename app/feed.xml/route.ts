import { getAllPosts } from '@/lib/mdx'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanshmundhra.dev'

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

export async function GET() {
    const posts = await getAllPosts()

    const feedItems = posts
        .slice(0, 20) // Latest 20 posts
        .map((post) => {
            return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>vanshmundhra9120@gmail.com (Vansh Mundhra)</author>
      ${post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ') || ''}
    </item>`
        })
        .join('')

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Vansh Mundhra - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical articles about Full Stack Development, AI/ML, and Software Engineering by Vansh Mundhra</description>
    <language>en-US</language>
    <managingEditor>vanshmundhra9120@gmail.com (Vansh Mundhra)</managingEditor>
    <webMaster>vanshmundhra9120@gmail.com (Vansh Mundhra)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>Vansh Mundhra - Blog</title>
      <link>${baseUrl}</link>
    </image>
    ${feedItems}
  </channel>
</rss>`

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
