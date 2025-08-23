
import { db } from "@/db/db";
import { projectTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";


interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
}


export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({error: "No Post Id Provided"}, {status: 400})
        }

        const data = await db.select().from(projectTable).where(
            eq(projectTable.id, id)
        );

        return NextResponse.json({success: true, data})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get projects' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {

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


        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'No post ID provided' }, { status: 400 });
        }

        const body = await req.json();
        const updated = await db.update(projectTable).set({
            title: body.title,
            description: body.description,
            livelink: body.links,
            githublink: body.githublink,
            category: body.category,
            projectImages: body.projectImages,
            tags: body.tags
        }).where(
            eq(projectTable.id, id)
        );
        return NextResponse.json(updated);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

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

        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
            return NextResponse.json({ error: 'No post ID provided' }, { status: 400 });
        }
        const deleted = await db.delete(projectTable).where(
            eq(projectTable.id, id)
        );
        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}