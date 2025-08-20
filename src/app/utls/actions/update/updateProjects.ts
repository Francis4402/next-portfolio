"use server"

import { TProject } from "@/app/types/Types";

const updateProjects = async (projects: TProject) => {
    
    const res = await fetch(`${process.env.BASE_URL}/projects/${projects.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
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