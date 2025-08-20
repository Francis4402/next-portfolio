"use server"



export const getMessages = async () => {
    
    const res = await fetch(`${process.env.BASE_URL}/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['messages']
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error('Failed to fetch messages');
    }

    return res.json();
};

export const getMessage = async (id: string) => {
    const res = await fetch(`${process.env.BASE_URL}/messages/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['messages']
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error('Failed to fetch message');
    }

    return res.json();
}