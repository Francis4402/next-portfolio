"use server"

import { revalidateTag } from "next/cache";


const deleteMessages = async (id: string) => {   
    
    try {
        const res = await fetch(`${process.env.BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            },
        });

        revalidateTag('message');

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default deleteMessages