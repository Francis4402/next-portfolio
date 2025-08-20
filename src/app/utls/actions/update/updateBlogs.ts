"use server"

import { TBlog } from "@/app/types/Types";


export const updateBlogs = async (blogs: TBlog) => {
    
    const res = await fetch(`${process.env.BASE_URL}/blogs/${blogs.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogs),
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to update blog');
    }

    const blogsInfo = await res.json();

    return blogsInfo;
};
