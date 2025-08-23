"use server"

import { TProject } from "@/app/types/Types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../authOptions";
import { revalidateTag } from "next/cache";




export const createProjects = async (projects: TProject) => {
    try {

        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "Admin") {
            throw new Error("Forbidden: Only admins can create projects");
        }

        const res = await fetch(`${process.env.BASE_URL}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(projects),
        cache: 'no-store'
    });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to create post');
        }

        revalidateTag('projects');

        return projects;
    } catch (error) {
        console.error("Error creating projects:", error);
        throw error;
    }
};