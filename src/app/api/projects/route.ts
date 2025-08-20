/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { projectTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";


export async function GET() {
    try {

        const projects = await db.select().from(projectTable)

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

        const existingProject = await db.select().from(projectTable).where(and(eq(projectTable.title, body.title), eq(projectTable.description, body.description), eq(projectTable.links, body.links)));

        if (existingProject.length > 0) {
            return NextResponse.json(
                { error: "Post with the same title and content already exists" },
                { status: 400 }
            );
        }

        const newProjects = await db.insert(projectTable).values({
            title: body.title,
            description: body.description,
            links: body.links,
            projectImages: body.projectImages,
            tags: body.tags
        });

        return NextResponse.json(newProjects, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}