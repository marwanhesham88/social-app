export type PostType = {
    _id: string;
    body: string;
    image?: string;
    user: UserType;
    createdAt: string;
    comments: CommentsType[];
}

export type UserType = {
    _id: string;
    name: string;
    photo: string;
}

export type CommentsType = {
    _id: string;
    content: string;
    post: string;
    createdAt: string;
    commentCreator: UserType;
}