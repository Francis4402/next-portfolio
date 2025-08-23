"use server"

import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { authOptions } from "../../authOptions";



const deleteBlogs = async (id: string) => {   
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "Admin") {
            throw new Error("Forbidden: Only admins can delete");
        }

        const res = await fetch(`${process.env.BASE_URL}/blogs/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        revalidateTag('blog');

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default deleteBlogs