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

  return {
    title: `${post.title} | Ziggers`,
    description: post.seoDescription,
    alternates: {
      canonical: `/blog/${id}`,
    },
    openGraph: {
      type: 'article',
      title: `${post.title} | Ziggers`,
      description: post.seoDescription,
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
  const idPromise = Promise.resolve(id);

  return <BlogPostClient idPromise={idPromise} />;
}
