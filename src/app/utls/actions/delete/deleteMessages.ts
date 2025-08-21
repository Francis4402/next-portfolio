"use server"

import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { authOptions } from "../../authOptions";


const deleteMessages = async (id: string) => {   
    
    try {

        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
            },
        });

        revalidateTag('message');

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default deleteMessages