"use server"



export const getProjects = async () => {
    
    const res = await fetch(`${process.env.BASE_URL}/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: "no-store",
        next: {
            tags: ['projects']
        },
    });

    if(!res.ok) {
        throw new Error('Failed to fetch projects');
    }

    return res.json();
};

export const getProject = async (id: string) => {
    const res = await fetch(`${process.env.BASE_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['projects']
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error('Failed to fetch project');
    }

    return res.json();
}