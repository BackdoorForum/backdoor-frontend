export interface IPost {
    _id: string;
    title: string;
    body: string;
    user: string;
    votes: [string];
    downVotes: [string];
    tags: [string];
    comments: [string];
    createdAt: Date;
    updatedAt: Date;
}

export interface IThread {
    title: string;
    body: string;
    posts: [string];
    numberOfPosts: number;
    user: string;
    createdAt: Date;
}

export interface IUser {
    permissionLevel: number;
    email: string;
    verified: Boolean;
    username: string;
    bio: string;
    score: number;
    joinedAt: Date;
    posts: [string];
    comments: [string];
    votedPosts: [string];
    votedComments: [string];
}

export interface IComment {
    user: string;
    body: string;
    post: string;
    votes: [string];
    downVotes: [string];
    edited: boolean;
    createdAt: Date;
    updatedAt: Date;
}