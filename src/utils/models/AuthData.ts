export interface FormData {
    username: string;
    email: string;
    password: string;
    error?: Error | null;
};

export interface User {
    profilePicture?: string | undefined;
    username: string;
    uid: string;
    blocked: [];
    email: string;
};

export interface ProfilePicture {
    file: File;
    url: string;
};
