import { TBlog } from '@/app/types/Types';
import BlogModel from '../AddModels/BlogModel';
import type { Metadata } from 'next'
import { getBlogs } from '@/app/utls/actions/getData/getBlogs';
import BlogCard from '../components/BlogCard';


export const metadata: Metadata = {
    title: 'Dashboard-Blogs',
    description: 'Blogs'
}


const Blogs = async () => {
    const blogs = await getBlogs();


    return (
        <div className="container mx-auto flex flex-col gap-10 p-6 md:p-12">

            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-bold text-white">All Blogs</h1>
                <BlogModel />
            </div>
    

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                {blogs?.length > 0 ? (
                    blogs.map((blog: TBlog) => <BlogCard key={blog.id} blog={blog} />)
                    ) : (
                    <p>No Blogs Posted Yet</p>
                )}
            </div>
        </div>
    )
}

export default Blogs
