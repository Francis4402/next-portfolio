"use client"

import { TBlog } from '@/app/types/Types';
import Link from 'next/link';
import Image from 'next/image';
import deleteBlogs from '@/app/utls/actions/delete/deleteBlogs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';



const BlogCard = ({ blog }: { blog: TBlog }) => {

    const {formState: {isSubmitting}} = useForm();

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteBlogs(id);

            if (res?.success) {
                toast.success("Blog Deleted Successfully");
            } else {
                toast.error(res?.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="bg-gray-900 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg flex flex-col">
        <Link href={`/blog/${blog.id}`} className="relative w-full aspect-[16/9] cursor-pointer">
            <Image
                width={500}
                height={300}
                src={blog.blogImages}
                alt={blog.title || "Blog Cover"}
                className="w-full h-52 object-cover"
            />
        </Link>

        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-200 hover:text-blue-400 transition-colors">
                {blog.title}
            </h3>
            <p className="mt-2 text-gray-300 text-sm line-clamp-3 truncate">
                {blog.description}
            </p>

            <div className="flex justify-between items-center mt-auto pt-4 gap-2">
                <Link 
                    href={`/dashboard/blog-updates/${blog.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-center"
                >
                    Update
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Post</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this post?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                                variant="destructive" 
                                onClick={() => handleDelete(blog.id!)}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>
  );
};

export default BlogCard;
