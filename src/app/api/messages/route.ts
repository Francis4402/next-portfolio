/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { messageTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { and, eq } from "drizzle-orm";

export async function GET() {
    try {
        const projects = await db.select().from(messageTable)

        return NextResponse.json(projects);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {

        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();

        const existingMessages = await db.select().from(messageTable).where(and(eq(messageTable.name, body.name), eq(messageTable.email, body.email), eq(messageTable.message, body.message)));

        if (existingMessages.length > 0) {
            return NextResponse.json(
                { error: "Post with the same title and content already exists" },
                { status: 400 }
            );
        }

        const newMessages = await db.insert(messageTable).values({
            name: body.name,
            email: body.email,
            message: body.message,
        });

        return NextResponse.json(newMessages, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}