import { AppwriteException, ID } from 'appwrite';

import { UploadOptions } from '@/utils/models/file';

import { storage } from './appwrite';

const upload = async ({
    bucketId,
    file,
    onProgress,
    onError,
    onComplete,
    uid,
}: UploadOptions) => {
    try {
        const filePath = `users/${uid}/${Date.now()}_${file.name}`;

        const response = await storage.createFile(
            bucketId,
            ID.unique(),
            file,
            [`read("user:${uid}")`, `write("user:${uid}")`],
            (progress) => {
                if (onProgress) {
                    const percent =
            (progress.chunksUploaded / progress.chunksTotal) * 100;
                    onProgress(percent);
                }
            },
        );

        if (onComplete) {
            const downloadURL = storage.getFileView(bucketId, response.$id);
            console.log('File available at', downloadURL);
            onComplete(downloadURL);
        }
        return response;
    } catch (error) {
        if (onError) {
            const appwriteError = error as AppwriteException;
            console.error('Upload error:', appwriteError.message);

            // Обработка различных ошибок (аналогично Firebase)
            switch (appwriteError.code) {
            case 401: // Unauthorized
                console.log("User doesn't have permission");
                break;
            case 409: // Conflict (например, файл уже существует)
                console.log('File already exists');
                break;
            case 413: // Payload Too Large
                console.log('File too large');
                break;
            default:
                console.log('Unknown error occurred');
            }

            onError(appwriteError);
        }
        throw error;
    }
};
