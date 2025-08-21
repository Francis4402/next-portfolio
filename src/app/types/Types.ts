export type TProject = {
    id?: string;
    title: string;
    livelink: string;
    githublink: string;
    category: string;
    description: string;
    projectImages: string;
    tags: string;
}

export type ProjectDataResponse = {
    data: TProject[];
}

export type TBlog = {
    id?: string;
    title: string;
    description: string;
    blogImages: string;
}

export type BlogsDataResponse = {
    data: TBlog[];
}


export type TMessage = {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt?: string;
    updatedAt?: string
}

export type MessagesDataResponse = {
    data: TMessage[];
}
