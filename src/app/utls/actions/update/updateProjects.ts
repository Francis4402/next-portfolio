"use server"

import { TProject } from "@/app/types/Types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../authOptions";

const updateProjects = async (projects: TProject) => {

    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "Admin") {
        throw new Error("Forbidden: Only admins can create blogs");
    }
    
    const res = await fetch(`${process.env.BASE_URL}/projects/${projects.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(projects),
    });

    if (!res.ok) {
        throw new Error('Failed to update project');
    }

    const projectInfo = await res.json();

    return projectInfo;
};

export default updateProjects;