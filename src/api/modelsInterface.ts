export interface IPost {
    _id: string;
    title: string;
    body: string;
    user: string;
    votes: [string];
    downVotes: [string];
    tags: [string];
    comments: [{ author: string, message: string, votes: number, createdAt: Date }];
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
    permission_level: number;
    email: string;
    verified: Boolean;
    username: string;
    bio: string;
    score: number;
    joinedAt: Date;
    posts: [string];
    votedPosts: [string];
    votedComments: [string];
}