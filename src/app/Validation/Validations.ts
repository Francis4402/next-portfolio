import { z } from "zod";

export const projectsSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters",
    }),
    tags: z.string().min(3, {
        message: "Tags must be at least 3 characters",
    }),
    category: z.string({
        message: "Category must be a valid category",
    }),
    livelink: z.string({    
        message: "Live Link must be a valid URL",
    }),
    githublink: z.string({    
        message: "Github Link must be a valid URL",
    }),
    description: z.string().min(8, {
        message: "Description must be at least 8 characters",
    }),
    projectImages: z.string({
        message: "Project Image must be a valid URL",
    }),
});


export const blogsSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters",
    }),
    description: z.string().min(8, {
        message: "Description must be at least 8 characters",
    }),
    blogImages: z.string({
        message: "Blog Image must be a valid URL",
    }),
});

export const messagesSchema = z.object({
    name: z.string().min(5, {
        message: "Name must be at least 5 characters",
    }),
    email: z.string({
        message: "Email must be a valid email",
    }),
    message: z.string().min(5, {
        message: "Message must be at least 5 characters",
    }),
});

export type projectSchemav = z.infer<typeof projectsSchema>;
export type blogSchemaV = z.infer<typeof blogsSchema>;
export type MessageSchemaV = z.infer<typeof messagesSchema>;