export interface FormData {
    username: string;
    email: string;
    password: string;
    error?: Error | null;
};

export interface User {
    profilePicture?: string;
    username: string;
    uid: string;
};

export interface ProfilePicture {
    file: File;
    url: string;
};
