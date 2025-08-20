"use server"

import { TMessage } from "@/app/types/Types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../authOptions";
import { revalidateTag } from "next/cache";



export const createMesssage = async (messages: TMessage) => {
    try {

            const session = await getServerSession(authOptions);

            const res = await fetch(`${process.env.BASE_URL}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify(messages),
            cache: 'no-store'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to create post');
        }

        revalidateTag('message');

        return messages;
    } catch (error) {
        console.error("Error creating messages:", error);
        throw error;
    }
};