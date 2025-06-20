import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'partyshark-f73dd.firebaseapp.com',
    projectId: 'partyshark-f73dd',
    storageBucket: 'partyshark-f73dd.firebasestorage.app',
    messagingSenderId: '205337610124',
    appId: '1:205337610124:web:0f941ff030a35190a838a9',
    measurementId: 'G-0MFYJ4KX9N',
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, provider, storage };
export default app;
