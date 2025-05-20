import { AppwriteException } from 'appwrite';

export interface UploadOptions {
  bucketId: string;
  file: File;
  onProgress?: (progress: number) => void;
  uid: string;
  onError?: (error: AppwriteException) => void;
  onComplete?: (downloadURL: string) => void;
}
