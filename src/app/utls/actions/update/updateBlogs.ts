"use server"

import { TBlog } from "@/app/types/Types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../authOptions";


export const updateBlogs = async (blogs: TBlog) => {
    
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "Admin") {
        throw new Error("Forbidden: Only admins can create blogs");
    }

    const res = await fetch(`${process.env.BASE_URL}/blogs/${blogs.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
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
