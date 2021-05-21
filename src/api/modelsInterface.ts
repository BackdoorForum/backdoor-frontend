export interface IPost {
    title: string;
    body: string;
    author: string;
    votes: [ string ];
    tags: [ string ];
    comments: [{ author: string, message: string, votes: number, createdAt: Date }];
    createdAt: Date;
    updatedAt: Date;
}

export interface IThread {
    title: string;
    body: string;
    posts: [ string ];
    numberOfPosts: number;
    author: string;
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
    posts:  [ string ];
    votedPosts: [ string ];
    votedComments: [ string ];
}