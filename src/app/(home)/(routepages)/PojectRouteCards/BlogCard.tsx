"use client";
import { TBlog } from '@/app/types/Types';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const BlogCardhome = ({ blog }: { blog: TBlog }) => {
  const router = useRouter();

  const handleBlogDetails = () => {
    router.push(`/blog/${blog.id}`);
  };

  return (
    <div className="bg-gray-900 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative w-full aspect-[16/9] cursor-pointer" onClick={handleBlogDetails}>
        <Image
          width={500}
          height={300}
          src={blog.blogImages}
          alt="Blog Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">{blog.title}</h3>
        <p className="mt-2 text-gray-400 text-sm">{blog.description}</p>
        
      </div>
    </div>
  );
};

export default BlogCardhome;
