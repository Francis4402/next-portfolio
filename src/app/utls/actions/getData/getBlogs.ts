"use server"



export const getBlogs = async () => {
    
    const res = await fetch(`${process.env.BASE_URL}/blogs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: {
            tags: ['blog']
        }
    });
    

    if (!res.ok) {
        throw new Error('Failed to fetch blogs');
    }

    return res.json();
};

export const getBlog = async (id: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/blogs/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                tags: ['blog']
            },
            cache: 'no-store'
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}