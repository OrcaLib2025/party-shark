import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { auth, storage } from '../firebase';

type uploadType = {
    type: 'messagePictures' | 'profilePictures';
};

const upload = async (file: File, type: uploadType, onProgress?: (progress: number) => void) => {
    const storageRef = ref(storage, `${type.type}/${auth.currentUser?.uid}/${Date.now()}_${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                if (onProgress) onProgress(progress);
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                } catch (error) {
                    reject(error);
                }
            },
        );
    });
};

export default upload;
