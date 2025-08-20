

import { getBlogs } from "@/app/utls/actions/getData/getBlogs";
import BlogCardSection from "./BlogCardSection";
import BlogTextSection from "./BlogTextSection";
import { TBlog } from "@/app/types/Types";


const Blogs = async () => {
        
        const blogs = await getBlogs();

        return (
            <div className="justify-center flex mb-20">
                <div className="container">
                <BlogTextSection />
        
                <div className="mt-20 flex flex-wrap gap-7 lg:justify-start justify-center cursor-default">
                    {
                        blogs?.length > 0 ? blogs?.map((blog: TBlog, index: number) => (
                            <BlogCardSection key={blog.id} index={index} blog={blog} />
                        )) : <div className='mt-20 text-center'>No Blogs Found</div>
                    }
                </div>
                </div>
            </div>
    );
}

export default Blogs