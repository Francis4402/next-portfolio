/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { messageTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({error: "No Post Id Provided"}, {status: 400})
        }

        const data = await db.select().from(messageTable).where(
            eq(messageTable.id, id)
        );

        return NextResponse.json({success: true, data})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get message' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
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

        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
            return NextResponse.json({ error: 'No post ID provided' }, { status: 400 });
        }
        const deleted = await db.delete(messageTable).where(
            eq(messageTable.id, id)
        );
        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}