"use server"

import { TBlog } from "@/app/types/Types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../authOptions";
import { revalidateTag } from "next/cache";



export const createBlogs = async (blogs: TBlog) => {
    try {

        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "Admin") {
            throw new Error("Forbidden: Only admins can create blogs");
        }

        const res = await fetch(`${process.env.BASE_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(blogs),
        cache: 'no-store'
    });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to create post');
        }

        revalidateTag('blog');

        return blogs;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};