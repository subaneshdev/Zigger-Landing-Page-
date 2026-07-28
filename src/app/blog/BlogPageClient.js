"use client";
import { useRouter } from 'next/navigation';
import Blog from '../../components/Blog';

export default function BlogPageClient() {
  const router = useRouter();
  return (
    <Blog
      activePostId={null}
      setActivePostId={(id) => id ? router.push(`/blog/${id}`) : router.push('/blog')}
      onBackToHome={() => router.push('/')}
    />
  );
}
