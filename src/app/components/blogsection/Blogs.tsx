import { getBlogs } from "@/app/utls/actions/getData/getBlogs";
import BlogCardSection from "./BlogCardSection";
import BlogTextSection from "./BlogTextSection";
import { TBlog } from "@/app/types/Types";

const Blogs = async () => {
  const blogs = await getBlogs();

  return (
    <div className="justify-center flex py-10 md:py-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl">
        <BlogTextSection />
        
        {blogs?.length > 0 ? (
          <div className="mt-10 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 cursor-default">
            {blogs.map((blog: TBlog, index: number) => (
              <BlogCardSection key={blog.id} index={index} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="mt-10 md:mt-16 lg:mt-20 text-center text-lg md:text-xl">
            No Blogs Found
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;