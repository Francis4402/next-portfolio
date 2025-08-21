
import type { Metadata } from 'next'

import { getBlogs } from '@/app/utls/actions/getData/getBlogs';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'My thoughts, ideas, and experiences'
}

const Blogs = async () => {
  const blogs = await getBlogs();

  return (
    <BlogClient blogs={blogs} />
  )
}

export default Blogs;