import { getBlogs } from "@/app/utls/actions/getData/getBlogs";
import BlogCardSection from "./BlogCardSection";
import BlogTextSection from "./BlogTextSection";
import { TBlog } from "@/app/types/Types";

const Blogs = async () => {
  const blogs = await getBlogs();

  return (
      <div className="container mx-auto md:px-0 px-5 mt-10">
        <div className="flex justify-center items-center text-center">
        <BlogTextSection />
        </div>
        
        {blogs?.length > 0 ? (
          <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 gap-5 items-center justify-center">
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
  );
}

export default Blogs;