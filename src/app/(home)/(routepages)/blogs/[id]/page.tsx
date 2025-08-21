import { getBlog } from '@/app/utls/actions/getData/getBlogs';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  const blogData = blog.data[0];

  return {
    title: blogData.title,
    description: blogData.description,
  }
}

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlog(id);
  const blogData = blog.data[0];

  // Generate reading time based on description length
  const readingTime = Math.ceil(blogData.description.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button asChild variant="ghost" className="-ml-3 mb-6">
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>

        {/* Blog Title and Metadata */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {blogData?.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {readingTime} min read
            </div>
          </div>
        </div>

        {/* Smaller Featured Image */}
        <div className="rounded-lg overflow-hidden mb-6 mx-auto max-w-md">
          <Image
            src={blogData.blogImages}
            alt={blogData.title}
            width={400}
            height={250}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Blog Description/Content */}
        <article className="prose dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed">
            {blogData?.description}
          </p>
        </article>
      </div>
    </div>
  )
}

export default BlogDetails;