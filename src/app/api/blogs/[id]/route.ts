/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'No post ID provided' }, { status: 400 });
        }

        const data = await db.select().from(blogTable).where(
            eq(blogTable.id, id)
        );

        return NextResponse.json({success: true, data});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get blogs' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
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

        const body = await req.json();
        
        const updated = await db.update(blogTable).set({
            title: body.title,
            description: body.description,
            blogImages: body.blogImages
        }).where(
            eq(blogTable.id, id)
        );
        return NextResponse.json(updated);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update blogs' }, { status: 500 });
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
        const deleted = await db.delete(blogTable).where(
            eq(blogTable.id, id)
        );
        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to delete blogs' }, { status: 500 });
    }
}