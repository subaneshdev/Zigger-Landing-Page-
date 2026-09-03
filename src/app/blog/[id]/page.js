import { BLOG_POSTS } from '../../../data/blogPosts';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = BLOG_POSTS.find((entry) => entry.id === id);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Ziggers',
    };
  }

  let baseTitle = post.seoTitle || post.title;
  if (!baseTitle.toLowerCase().includes('ziggers')) {
    baseTitle = `${baseTitle} | Ziggers`;
  }

  return {
    title: baseTitle,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${id}`,
    },
    openGraph: {
      type: 'article',
      title: baseTitle,
      description: post.seoDescription || post.excerpt,
      images: [
        {
          url: post.image || '/og-image.jpg',
        },
      ],
    },
  };
}

export default async function BlogPostRoute({ params }) {
  // Resolve the id promise
  const { id } = await params;
  const post = BLOG_POSTS.find((entry) => entry.id === id);
  const idPromise = Promise.resolve(id);

  return (
    <>
      {post?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
        />
      )}
      <BlogPostClient idPromise={idPromise} />
    </>
  );
}
