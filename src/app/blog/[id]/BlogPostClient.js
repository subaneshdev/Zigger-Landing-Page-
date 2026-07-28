"use client";
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import Blog from '../../../components/Blog';

export default function BlogPostClient({ idPromise }) {
  const router = useRouter();
  const id = use(idPromise);
  
  return (
    <Blog
      activePostId={id}
      setActivePostId={(newId) => newId ? router.push(`/blog/${newId}`) : router.push('/blog')}
      onBackToHome={() => router.push('/')}
    />
  );
}
