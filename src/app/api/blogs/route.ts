
import { db } from "@/db/db";
import { blogTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
}

export async function GET() {
    try {
        const blogs = await db.select().from(blogTable);
        return NextResponse.json(blogs);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get blogs' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        let decoded: MyJwtPayload;
        try {
            decoded = jwt.verify(
                token,
                process.env.AUTH_SECRET as string
            ) as MyJwtPayload;
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }


        if (decoded.role !== "Admin") {
            return NextResponse.json(
                { error: "Forbidden: Only admins can create projects" },
                { status: 403 }
            );
        }

        const body = await req.json();

        const existingPost = await db
            .select()
            .from(blogTable)
            .where(
                and(eq(blogTable.title, body.title), eq(blogTable.description, body.description))
            );

        if (existingPost.length > 0) {
            return NextResponse.json(
                { error: "Post with the same title and content already exists" },
                { status: 400 }
            );
        }

        const newBlogs = await db.insert(blogTable).values({
            title: body.title,
            description: body.description,
            blogImages: body.blogImages
        }).returning({
            title: blogTable.title,
            description: blogTable.description,
            blogImages: blogTable.blogImages,
        });

        return NextResponse.json(newBlogs);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create blogs" }, { status: 500 });
    }
}