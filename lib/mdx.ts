import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  date: string
  author: string
  description: string
  tags?: string[]
  featured?: boolean
  readTime?: string
  content: string
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, 'blog')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(
    filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        
        // Extract frontmatter
        const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---/)
        const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
        const content = fileContents.replace(/^---\n[\s\S]*?\n---/, '').trim()
        
        // Parse frontmatter
        const metadata: any = {}
        frontmatter.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':')
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim()
            if (key === 'tags') {
              metadata[key] = value.replace(/[\[\]]/g, '').split(',').map((tag: string) => tag.trim().replace(/['"]/g, ''))
            } else if (key === 'featured') {
              metadata[key] = value === 'true'
            } else {
              metadata[key] = value.replace(/['"]/g, '')
            }
          }
        })
        
        return {
          slug,
          ...metadata,
          content
        } as Post
      })
  )
  
  // Sort by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function compileMDXContent(source: string) {
  return await compileMDX({
    source,
  })
}
