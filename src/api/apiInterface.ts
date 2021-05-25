export interface ISignUp {
    email?: string;
    username?: string;
    password?: string;
}

export interface ILogIn {
    username?: string;
    password?: string;
}

export interface IUpdateUser {
    username?: string;
    bio?: string;
    password?: string;
}

export interface IPostData {
    title: string;
    body: string;
    tags: [ string ];
}

export interface IThreadData {
    title: string;
    body: string;
}

export interface ICommentData {
    body: string
}