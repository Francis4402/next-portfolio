export const publicRoutes = [
    "/", "/projects", "/blogs", "/contact",  "/projects/:id", "/blogs/:id", "/:id"
];

export const adminRoutes = [
    "/dashboard", "/", "/dashboard/projects", "/dashboard/blogs", "/dashboard/messages", "/projects/:id", "/blogs/:id", "/:id"
];

export const userRoutes = [
    "/", "/projects/:id", "/blogs/:id", "/:id"
];


export const DEFAULT_LOGIN_REDIRECT = "/";